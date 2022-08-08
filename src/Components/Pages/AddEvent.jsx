import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
const AddEvent = () => {
    const [image, setImage] = useState()
    console.log('image', image)
    const [percent, setPercent] = useState(0);

    useEffect(() =>{
        if(image){
            submit()
        }
    }, [image])


    const submit = () => {
        alert('call')
        const storageRef = ref(storage, `/files/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    }
    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-0">
                            <div className="col-sm-6">
                                <h5 className="m-0 text-dark">Add Event</h5>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Add Event</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}

                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card card-primary">
                                    {/* <div class="card-header">
                                        <h3 class="card-title">Quick Example <small>jQuery Validation</small></h3>
                                    </div> */}
                                    <form id="quickForm">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Event Name</label>
                                                <input type="file" onChange={(e) => setImage(e.target.files[0])} name="file" class="form-control" id="exampleInputEmail1" />
                                            </div>
                                            <p>{percent}</p>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Event Name</label>
                                                <input type="email" name="email" class="form-control" id="exampleInputEmail1" placeholder="Enter Event Name . . ." />
                                            </div>
                                            <div class="form-group">
                                                <label>Event Date and time:</label>
                                                <div class="input-group date" id="reservationdatetime" data-target-input="nearest">
                                                    <input type="datetime-local" class="form-control datetimepicker-input" data-target="#reservationdatetime" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Notes Desc</label>
                                                <textarea name="" id="" cols="30" rows="6" class="form-control"></textarea>
                                                {/* <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" /> */}
                                            </div>
                                            <div class="form-group mb-0">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="terms" class="custom-control-input" id="exampleCheck1" />
                                                    <label class="custom-control-label" for="exampleCheck1">I agree to the <a href="#">terms of service</a>.</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer">
                                            <button type="button" class="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default AddEvent