import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebaseDB from './../../firebase'
import moment from 'moment'
import { useUserInfo } from '../Context/UserData'
const MyNotes = () => {
    const [notes, setNotes] = useState([])
    const { user, deleteNotes, updateData } = useUserInfo()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getNotes()
    }, [])
    const getNotes = () => {
        firebaseDB.child('notes').on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                let notes = snapshot.val();
                let newNoteState = [];
                for (let data in notes) {
                    if (notes[data].uid == user.uid) {
                        newNoteState.push({
                            id: data,
                            note: notes[data].note,
                            name: notes[data].name,
                            status: notes[data].status,
                            created_date: notes[data].created_date,
                        })
                    }
                }
                setNotes(newNoteState);
            } else {
                setNotes([])
            }
        })

    }

    const deleteNote = (id) => {
        deleteNotes(id)
    }

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-0">
                            <div className="col-sm-6">
                                <h5 className="m-0 text-dark">My Notes</h5>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/" className='text-dark'>Dashboard</Link></li>
                                    <li className="breadcrumb-item active"><Link to="/add-notes" className='text-dark'>My Notes</Link></li>
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
                                <div class="card">
                                    <div class="card-body pt-0">
                                        <h4 id='notDataMsg'></h4>

                                        <div className="row">
                                            {
                                                notes ? notes.map((data, i) => (
                                                    <div class="col-sm-4 mt-4" key={i}>
                                                        <div class="position-relative p-3 bg-gray" style={{ height: '180px' }}>
                                                            <div class="ribbon-wrapper">
                                                                <div class="ribbon bg-primary">
                                                                    Notes
                                                                </div>
                                                            </div>
                                                            <span className='pb-1 m-0' style={{ borderBottom: '2px solid #007bff ' }}>{data.name}</span> <br />

                                                            <small> {data.note.substring(0, 130)}{data.note.length > 130 ? '  . . .' : null}</small>

                                                            <div style={{ display: 'block', position: 'absolute', bottom: '10px', left: '16px' }}>
                                                                <span style={{ fontSize: '12px' }}>{moment(data.created_date).format('DD-MM-YYYY hh:mm')}</span>
                                                                <div className='text-right float-right'>
                                                                    <button type="button" onClick={(e) => deleteNote(data.id)} class="btn text-white p-0 ml-2">
                                                                        <i class="fas fa-trash"></i>
                                                                    </button>

                                                                    <button type="button" class="btn text-white p-0 ml-2">
                                                                        <Link to={`/add-notes?id=${data.id}`} className='text-white'>
                                                                            <i class="fas fa-edit"></i>
                                                                        </Link>

                                                                    </button>

                                                                    <button type="button" class="btn p-0 ml-2">
                                                                        <Link to={`/view-notes/${data.id}`} className='text-white'>
                                                                            <i class="fas fa-eye"></i>
                                                                        </Link>
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                                    : ' Loading ...'
                                            }
                                        </div>

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

export default MyNotes