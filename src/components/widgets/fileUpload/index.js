import React , { useState} from 'react';
import axios from "axios"
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
})

const getLoggedInUserToken = () => {
    return typeof localStorage !== 'undefined' && localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')).tokens && JSON.parse(localStorage.getItem('userDetail')).tokens.access.token;
}

const Index = (props) => {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [progress, setProgress] = useState()
    
    const submitHandler = e => {
        e.preventDefault() //prevent the form from submitting
        let formData = new FormData()
        formData.append("file", selectedFiles[0])
        axiosInstance.post("/api/file/upload", formData, {
            onUploadProgress: data => {
                setProgress(Math.round((100 * data.loaded) / data.total))
            },
        })
    }
    return (
        <div>
            <form
                action="http://localhost:5000/api/file/upload"
                method="post"
                encType="multipart/form-data"
                onSubmit={submitHandler}
            >
                 <input 
                    type="file"  
                    id="exampleFormControlFile1"
                    label="Select a File"
                    name="file"
                    onChange={e => {
                        setSelectedFiles(e.target.files)
                    }}
                />
                <button type="submit">
                    Upload
                </button>
                {progress}
            </form>        
        </div>
    )

}

export default Index;