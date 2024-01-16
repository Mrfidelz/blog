"use client"
import { useEffect, useState } from "react";
import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; 
import DOMPurify from 'dompurify';


const AdminPostForm = ({userId}) => {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");


  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      formData.append("userId", userId);
      formData.set("img", media); 
      // Sanitize HTML content before saving
      const sanitizedContent = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
    
      formData.append("desc", sanitizedContent);

      await formAction(formData);
      // Clear the form or provide feedback to the user
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const [state, formAction] = useFormState(addPost, undefined);

 
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      <input  name="img" placeholder="add image" type="file" id="image" onChange={(e) => setFile(e.target.files[0])}/>
      <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      placeholder="Tell your story..."
    />
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
