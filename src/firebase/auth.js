import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async (updateIsAdmin) => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const uid = user.uid;

  try {
    const adminDoc = await getDocs(
      query(
        collection(db, "roles"),
        where("adminIds", "array-contains", user.uid)
      )
    );

    // console.log(admin);
    const rolesDoc = doc(db, "roles", "users");
    const rolesSnapshot = await getDoc(rolesDoc);

    if (rolesSnapshot.exists()) {
      const data = rolesSnapshot.data();
      if (!data.userIds.includes(uid)) {
        await updateDoc(rolesDoc, {
          userIds: arrayUnion(uid),
        });
      }
    } else {
      console.error("No such document!");
    }

    if (!adminDoc.empty) {
      // User is an admin
      updateIsAdmin(true);
      return { ...result, isAdmin: true };
    }
  } catch (error) {
    console.error("Error checking user UID: ", error);
  }

  // User is not an admin
  updateIsAdmin(false);
  return { ...result, isAdmin: false };
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
