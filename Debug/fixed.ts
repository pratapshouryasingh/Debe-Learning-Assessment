import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

interface BookingRequest {
  studentId: string;
  teacherId: string;
  slot: string; // ISO datetime string
  subject: string;
}

export const bookSession = functions.https.onCall(
  // added async because we have to wait for firestore queries
  async (data: BookingRequest, context) => {

    // no auth was required in the original code which was a security issue.
    // any unauthenticated caller could invoke this Cloud Function
    // and create bookings.
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentication is required to book a session."
      );
    }

    const booking = {
      studentId: data.studentId,
      teacherId: data.teacherId,
      slot: data.slot,
      subject: data.subject,
      status: "confirmed",
      createdAt: new Date(),
    };

    const teacherRef = db
      .collection("teachers")
      .doc(data.teacherId);

    /*
      Firestore queries are asynchronous. Without awaiting the query,
      existing is a Promise instead of a QuerySnapshot, so
      existing.docs would fail and the slot validation would not work.
    */
    const existing = await teacherRef
      .collection("bookings")
      .where("slot", "==", data.slot)
      .get();

    if (existing.docs.length > 0) {
      return {
        success: false,
        message: "Slot already booked",
      };
    }

    /*
      Firestore writes are async but the function immediately returns
      success true without waiting for the write. If Firebase somehow
      fails to save the booking, the user will still get success: true.
      So we have to await the write.
    */

    // await db.collection("bookings").add(booking);

    /*
      The duplicate check reads from the teacher's bookings subcollection,
      but the booking was being written to a different top-level collection.
      This means the check and the actual booking were using different places,
      so duplicate bookings could happen.
    */
    await teacherRef
      .collection("bookings")
      .add(booking);

    return {
      success: true,
    };
  }
);