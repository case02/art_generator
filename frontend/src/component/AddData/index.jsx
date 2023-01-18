import React from 'react'
import { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";

export default function AddData({inputs, title}) {
  const [file, setFile] = useState("");
  return (
    <div className="add-data">
      <div className="addData-container">
        <h1>{title}</h1>
      </div>
    </div>
  )
}
