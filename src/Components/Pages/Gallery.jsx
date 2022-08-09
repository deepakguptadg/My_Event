import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
import firebaseDB from '../../firebase'
import { useUserInfo } from '../Context/UserData';
const Gallery = () => {
    const [page, setPage] = useState(false)
    const [percent, setPercent] = useState('');
    const [image, setImage] = useState()
    const [url, setUrl] = useState('')
    const [getGallery, setGallery] = useState([])
    useEffect(() => {
        if (image) {
            hadndleImage()
        }
    }, [image])
    const navigate = useNavigate()
    const { user } = useUserInfo()
    const hadndleImage = () => {
        const storageRef = ref(storage, `/Gallery/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // setPercent(percent);
                console.log('percent', percent)
                if(percent > 0 && percent < 100){
                    setPercent('Please Wait a Second !!')
                }else if(percent === 100){
                    setPercent('You can Upload  !!')
                }
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log('imageURL', url);
                    setUrl(url)
                });
            }
        );
    }
    const data = {
        'image_url': url,
        'created_date': new Date().toString(),
        'status': 1,
        'uid': user.uid
    }
    const uploadImage = (e) => {
        e.preventDefault()
        if (url) {
            firebaseDB.child("gallery").push(data, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    alert('Image Uploaded Succesfully !!');
                    setPage(false)
                }
            })
        } else {
            alert('Please Select file !!')
        }
    }

    useEffect(() => {
        getImage()
    }, [])
    const getImage = () => {
        firebaseDB.child('gallery').on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                console.log('Get Gallery By User Id', snapshot.val())
                const gallery = snapshot.val()
                const newGallery = []
                for (let data in gallery) {
                    if (gallery[data].uid == user.uid) {
                        newGallery.push({
                            id: data,
                            img_url: gallery[data].image_url,
                            status: gallery[data].status,
                            created_date: gallery[data].created_date,
                        })
                    }
                }
                console.log('newGallery', newGallery)
                setGallery(newGallery)
            }else{
                setGallery('loading...')
            }
        })
    }
    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-0">
                            <div className="col-sm-6">
                                <h5 className="m-0 text-dark">Gallery</h5>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item active" style={{ cursor: 'pointer' }} onClick={() => setPage(true)}>Add Gallery</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}

                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card card-primary">
                                    <div class="card-body">
                                        {
                                            page ?
                                                <div className="row">
                                                    <div className="col-12">
                                                        <input type="file" accept='.jpg, .png' onChange={(e) => setImage(e.target.files[0])} name="file" className='form-control' />
                                                        <span>{ percent}</span>
                                                    </div>
                                                    <div className="col-12 mt-3">
                                                        <button className='btn btn-primary' onClick={() => setPage(false)}>Cencal</button>
                                                        <button className='btn btn-primary ml-2' onClick={(e) => uploadImage(e)}>Upload</button>
                                                    </div>
                                                </div>
                                                :
                                                <div class="row">

                                                    {
                                                        getGallery ? getGallery.map((data, i) => (
                                                            <>
                                                                <div class="col-sm-2" key={i}>
                                                                    <a href={data.img_url} data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
                                                                        <img src={data.img_url} class="img-fluid mb-2" alt="white sample" />
                                                                    </a>
                                                                </div>
                                                            </>
                                                        ))
                                                            : <div className="col-12">
                                                                <h5 className='text-center'> There are No Image To Show !!</h5>
                                                            </div>
                                                    }
                                                </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Gallery