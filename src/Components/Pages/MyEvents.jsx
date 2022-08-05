import React from 'react'
import { Link } from 'react-router-dom'
const MyEvents = () => {
    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-0">
                            <div className="col-sm-6">
                                <h5 className="m-0 text-dark">My Events</h5>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">My Events</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card card-primary">
                                    <div class="card-body pt-0">
                                        <div class="row">
                                            <div class="col-sm-4 mt-4">
                                                <div class="position-relative p-3 bg-gray" style={{ height: '180px' }}>
                                                    <div class="ribbon-wrapper">
                                                        <div class="ribbon bg-primary">
                                                            Ribbon
                                                        </div>
                                                    </div>
                                                    Ribbon Default <br />
                                                    <small>.ribbon-wrapper.ribbon-lg .ribbon</small>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 mt-4">
                                                <div class="position-relative p-3 bg-gray" style={{ height: '180px' }}>
                                                    <div class="ribbon-wrapper ribbon-lg">
                                                        <div class="ribbon bg-info">
                                                            Ribbon Large
                                                        </div>
                                                    </div>
                                                    Ribbon Large <br />
                                                    <small>.ribbon-wrapper.ribbon-lg .ribbon</small>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 mt-4">
                                                <div class="position-relative p-3 bg-gray" style={{ height: '180px' }}>
                                                    <div class="ribbon-wrapper ribbon-xl">
                                                        <div class="ribbon bg-secondary">
                                                            Ribbon Extra Large
                                                        </div>
                                                    </div>
                                                    Ribbon Extra Large <br />
                                                    <small>.ribbon-wrapper.ribbon-xl .ribbon</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-4 mt-4">
                                                <div class="position-relative p-3 bg-gray" style={{ height: '180px' }}>
                                                    <div class="ribbon-wrapper ribbon-lg">
                                                        <div class="ribbon bg-success text-lg">
                                                            Ribbon
                                                        </div>
                                                    </div>
                                                    Ribbon Large <br /> with Large Text <br />
                                                    <small>.ribbon-wrapper.ribbon-lg .ribbon.text-lg</small>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 mt-4">
                                                <div class="position-relative p-3 bg-gray" style={{ height: '180px' }}>
                                                    <div class="ribbon-wrapper ribbon-xl">
                                                        <div class="ribbon bg-warning text-lg">
                                                            Ribbon
                                                        </div>
                                                    </div>
                                                    Ribbon Extra Large <br /> with Large Text <br />
                                                    <small>.ribbon-wrapper.ribbon-xl .ribbon.text-lg</small>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 mt-4">
                                                <div class="position-relative p-3 bg-gray" style={{ height: '180px' }}>
                                                    <div class="ribbon-wrapper ribbon-xl">
                                                        <div class="ribbon bg-danger text-xl">
                                                            Ribbon
                                                        </div>
                                                    </div>
                                                    Ribbon Extra Large <br /> with Extra Large Text <br />
                                                    <small>.ribbon-wrapper.ribbon-xl .ribbon.text-xl</small>
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

export default MyEvents