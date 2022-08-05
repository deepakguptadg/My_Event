import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import firebaseDB from '../../firebase';
import { useUserInfo } from '../Context/UserData';
const AddNotes = () => {

    const useQuery = () => new URLSearchParams(useLocation().search)
    const updId = useQuery().get('id')

    const [noteVal, setNotesVal] = useState({
        'name': '',
        'note': ''
    })

    const { user } = useUserInfo()
    const data = {
        'name': noteVal.name,
        'note': noteVal.note,
        'created_date': new Date().toString(),
        'status': 1,
        'uid': user.uid
    }
    const navigate = useNavigate();
    const Add_Note = (e) => {
        e.preventDefault()
        if (noteVal.name && noteVal.note) {
            firebaseDB.child("notes").push(data, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    alert('Notes Saved Succesfully !!');
                    navigate('/my-notes')
                }
            })
        } else {
            alert('fill All Fields')
        }
    }

    useEffect(() => {
        if (updId) {
            updateData()
        }
    }, [])

    const updateData = () => {
        firebaseDB.child('notes').child(updId).on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                let notesData = snapshot.val();
                let {name, note} = notesData;
                setNotesVal({
                    ...noteVal, 
                    'name': name,
                    'note': note,
                })
            } else {
                setNotesVal('')
            }
        })
    }

    const Update_Note = (e) => {
        e.preventDefault()
        if (noteVal.name && noteVal.note) {
            firebaseDB.child("notes").child(updId).set(data, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    alert('Notes Updated Succesfully !!');
                    navigate('/my-notes')
                }
            })
        } else {
            alert('fill All Fields')
        }
    }

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-0">
                            <div className="col-sm-6">
                                <h5 className="m-0 text-dark">Add Notes</h5>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Add Notes</li>
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
                                    <form id="quickForm">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Notes Title</label>
                                                <input type="email" name="email" class="form-control" value={noteVal.name}
                                                    onChange={(e) => setNotesVal({ ...noteVal, ['name']: e.target.value })} id="exampleInputEmail1" placeholder="Enter Notes Title . . ." />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Notes Desc</label>
                                                <textarea name="" id="" cols="30" rows="6" value={noteVal.note} onChange={(e) => setNotesVal({ ...noteVal, ['note']: e.target.value })} class="form-control"></textarea>
                                            </div>

                                            <div class="form-group mb-0">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="terms" class="custom-control-input" id="exampleCheck1" />
                                                    <label class="custom-control-label" for="exampleCheck1">I agree to the <a href="#">terms of service</a>.</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer">
                                            <button type="button" onClick={(e) => updId ? Update_Note(e) : Add_Note(e)} class="btn btn-primary"> {updId ? "Update Note" : "Add Note"} </button>
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

export default AddNotes