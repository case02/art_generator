import './App.css';
import { useEffect, useState } from 'react';
import ImageUpload from './components/ImageUpload';
// import { storage } from "./firebase";
// import {
// 	ref,
// 	uploadBytes,
// 	getDownloadURL,
// 	listAll,
// 	list,
// } from 'firebase/storage';
// import { v4} from 'uuid';

// api methods
import {getIndexRoute} from './utils/api'

function App() {

  const [index, setIndex]= useState([]);

  useEffect(() => {
		try {
			getIndexRoute().then((data) => {
				setIndex(data);
        console.log('this is', data);
			});
		} catch (error) {
			console.log(error);
		}
	}, [])
  
  // // image upload methods
  // const [imageUpload, setImageUpload] = useState(null);
	// const [imageUrls, setImageUrls] = useState([]);

	// const imagesListRef = ref(storage, 'images/');
  // const uploadImage = () => {
  //   if(imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then(() => {
  //     alert('image uploaded');
  //   })
  // }
  return (
		<div className='App'>
      <ImageUpload />
		</div>
	);
}

export default App;
