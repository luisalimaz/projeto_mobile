// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AlzaSyAt4NbZ1lQt7JVscRN2Ir_PYhiVIb5A7jw',
  authDomain: 'projetomobile2.firebaseapp.com',
  projectId: 'projetomobile2-bd9c3',
  storageBucket: 'projetomobile2.appspot.com',
  messagingSenderId: '31138425681', 
  appId: '1:31138425681:android:adae7ec43fae607edd4170', 
};

export const app = initializeApp(firebaseConfig);