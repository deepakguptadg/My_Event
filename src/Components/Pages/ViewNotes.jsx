import React, {useState, useEffect} from 'react'
import { Link ,useParams, useNavigate} from 'react-router-dom'
import firebaseDB from '../../firebase'
import moment from 'moment'
import { useUserInfo } from '../Context/UserData'
const ViewNotes = () => {
    const {id} = useParams();
    const [notes, setNotes] = useState([])
    const {deleteNotes} = useUserInfo();
    const navigate = useNavigate()
    useEffect(() => {
        getNotes()
    }, [])
    const getNotes = () => {
        firebaseDB.child('notes').child(id).on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                let notesData = snapshot.val();
                setNotes(notesData);
            } else {
                setNotes([])
            }
        })
    }
    const deleteNote =(id)=>{
        deleteNotes(id)
        navigate('/my-notes')
    }
    console.log('note1', notes)

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-0">
                            <div className="col-sm-6">
                                <h5 className="m-0 text-dark"> <Link className='text-dark' to='/my-notes'> My Notes </Link> >> View Notes</h5>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">My Notes</li>
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
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>{notes.name}</h5>
                                                <p style={{ textAlign: 'justify' }}> {notes.note}</p>

                                                <div className='d-flex justify-content-between'>
                                                    <p>Date :- {moment(notes.created_date).format('DD-MM-YYYY hh:mm')}</p>
                                                    <p>
                                                        <button type="button" class="btn p-0 mr-2">
                                                            <Link to='/my-notes' className='text-dark'>
                                                                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                                                            </Link>
                                                        </button>
                                                        <button type="button" onClick={(e) => deleteNote(id)} class="btn text-dark p-0 mr-2 ml-2">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                        <button type="button" class="btn text-dark p-0 ml-2">
                                                            <Link to={`/add-notes?id=${id}`} className='text-dark'>
                                                                <i class="fas fa-edit"></i>
                                                            </Link>
                                                        </button>

                                                    </p>
                                                </div>
                                            </div>
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

export default ViewNotes