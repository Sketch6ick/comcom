// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'; // นำเข้าฟังก์ชันที่เกี่ยวข้องกับการใช้งาน Authentication

const firebaseConfig = {
    apiKey: "AIzaSyCBM7_giZQ5f-L9NQvCXXtgbez0uzIq18c",
    authDomain: "computerstore-170e1.firebaseapp.com",
    projectId: "computerstore-170e1",
    storageBucket: "computerstore-170e1.firebasestorage.app",
    messagingSenderId: "947649343012",
    appId: "1:947649343012:web:b61f40e3248d2ebc9772b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// กำหนด collection สำหรับสินค้า
const productsCollection = collection(db, 'products');

export { auth, db, productsCollection, getDocs, addDoc, deleteDoc, doc, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
