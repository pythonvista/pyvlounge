import { initializeApp } from 'firebase/app';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  verifyPasswordResetCode,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: 'lounge-6d2dd.firebaseapp.com',
    projectId: 'lounge-6d2dd',
    storageBucket: 'lounge-6d2dd.appspot.com',
    messagingSenderId: '1019637623335',
    appId: '1:1019637623335:web:651657dfb08a4de7a2fc02',
    measurementId: 'G-7YRW5F2QGJ',
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  function AuthFunc() {
    this.signup = (email, password) => {
      let data = createUserWithEmailAndPassword(auth, email, password);
      return data;
    };

    this.login = (email, password) => {
      let data = signInWithEmailAndPassword(auth, email, password);
      return data;
    };
    this.signout = () => {
      let data = signOut(auth);
      return data;
    };
    this.reset = (email) => {
      const res = sendPasswordResetEmail(auth, email);
      return res;
    };

    this.verifyemail = (email) => {
      const res = sendEmailVerification(auth, email);
      return res;
    };

    this.verifycode = (code) => {
      const res = verifyPasswordResetCode(auth, code);
      return res;
    };

    this.confirmreset = (code, newpassword) => {
      const res = confirmPasswordReset(auth, code, newpassword);
      return res;
    };
    this.changeEmail = (email, curruser) => {
      const data = updateEmail(curruser, email);
      return data;
    };
    this.changePassword = (password, curruser) => {
      const data = updatePassword(curruser, password);
      return data;
    };

    this.UserState =  ()=>{

     return auth
    } 
  }

  function CRUD() {
    this.addDocWithId = (dbname, userId, arrayinfo) => {
      let arr = { ...arrayinfo, CreatedAt: serverTimestamp() };
      let data = setDoc(doc(db, dbname, userId), arr);
      return data;
    };

    this.addDocWithoutId = (dbname, dform) => {
      let collRef = collection(db, dbname);
      let data = addDoc(collRef, { ...dform, CreatedAt: serverTimestamp() });
      return data;
    };

    this.getSingleDoc = (dbname, user_id) => {
      let res = getDoc(doc(db, dbname, user_id));
      return res;
    };
    this.updateDocument = (dbname, userId, arrayinfo) => {
      const selectedUser = doc(db, dbname, userId);
      return updateDoc(selectedUser, arrayinfo);
    };
    this.removeDoc = (dbname, db_id) => {
      return deleteDoc(doc(db, dbname, db_id));
    };
    this.queryDoc = (dbname, where1, where2) => {
      const collRef = collection(db, dbname);
      const q = query(collRef, where(where1, '==', where2));
      return q;
    };
    (this.getAllQueryDoc = async (dbname, where1, where2, sort = '') => {
      let docs = [];
      const q = query(
        collection(db, dbname),
        where(where1, '==', where2),
        orderBy('CreatedAt', sort)
      );
      const querySnapshot =  await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), docid: doc.id });
      });

      return docs;
    }),
      (this.getAllDoc = async (dbname, sort = '', uid = '') => {
        let docs = [];
        if (sort == 'asc') {
          const q = query(collection(db, dbname), orderBy('CreatedAt', 'asc'));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), docid: doc.id });
          });
        }
        if (sort == 'desc') {
          const q = query(collection(db, dbname), orderBy('CreatedAt', 'desc'));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), docid: doc.id });
          });
        }
        if (sort == '') {
          const querySnapshot = await getDocs(collection(db, dbname));
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), docid: doc.id });
          });
        }

        return docs;
      });
  }
  const authfunc = new AuthFunc();
  const crud = new CRUD();
  nuxtApp.vueApp.provide('authfunc', authfunc);
  nuxtApp.provide('authfunc', authfunc);
  nuxtApp.provide('crud', crud);
  nuxtApp.vueApp.provide('crud', crud);
});
