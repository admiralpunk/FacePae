import Sidebar from '../sidebar';
import { useState } from 'react';
import axios from 'axios';

function Setting() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const [qrfile, setQRFile] = useState(null);

    const handleQRFileChange = (event) => {
        setQRFile(event.target.files);
    };

    const [newOrderNotification, setNewOrderNotification] = useState(true);
    const [newOrderSoundAlert, setNewOrderSoundAlert] = useState(true);
    const [orderDelayNotification, setOrderDelayNotification] = useState(true);
    const [orderDelaySoundAlert, setOrderDelaySoundAlert] = useState(true);
    const [emailSummary, setEmailSummary] = useState(true);

    return (
        <>
            <Sidebar />
            <div className="admin-panel-setting-container">
                <header className="admin-panel-setting-header">
                    <div className="header-left">
                        <h1>Settings</h1>
                        <p>Manage your account setting and preferences.</p>
                    </div>
                    <div className="admin-panel-setting-header-actions">
                        <img src="/settings-imgs/uil_search.svg" alt="" />
                        <input type="text" className='admin-panel-setting-searchbar' />
                    </div>
                </header>
                <main className="admin-panel-setting-main">
                    <div className="admin-panel-setting-sidebar">
                        <a href="#general">
                            <div className="settings-sidebar-options">
                                <img src="/settings-imgs/general.svg" alt="" />
                                <span className='span'>General</span>
                            </div>
                        </a>
                        <a href="#payments">
                            <div className="settings-sidebar-options">
                                <img src="/settings-imgs/payments.svg" alt="" />
                                <span>Payments</span>
                            </div>
                        </a>
                        <a href="#notifications">
                            <div className="settings-sidebar-options">
                                <img src="/settings-imgs/bell.svg" alt="" />
                                <span>Notification</span>
                            </div>
                        </a>
                        <a href="#security">
                            <div className="settings-sidebar-options">
                                <img src="/settings-imgs/security.svg" alt="" />
                                <span>Security</span>
                            </div>
                        </a>
                    </div>
                    <form method="post">
                        <div className="admin-panel-setting-content">
                            <div className="admin-panel-setting-section" id='general'>
                                <div className="admin-panel-setting-section-left">
                                    <h2 className="admin-panel-setting-title">General Settings</h2>
                                    <p className="admin-panel-setting-subtitle">Changes made here reflects to user, changes will appear in pos machines.</p>
                                    <div className="admin-panel-setting-row">
                                        <label>Restaurant Name</label>
                                        <input type="text" id="name"  onChange={(event) => setName(event.target.value)} className="admin-panel-setting-input" placeholder="Restaurant Name" />
                                    </div>

                                    <div className="admin-panel-setting-row">
                                        <label>Location</label>
                                        <input type="text" className="admin-panel-setting-input" placeholder="Location" />
                                    </div>

                                    <div className="admin-panel-setting-row">
                                        <label>Default Currency</label>
                                        <select className="admin-panel-setting-select">
                                            <option value="">Select Currency</option>
                                        </select>
                                    </div>

                                    <div className="admin-panel-setting-row">
                                        <label>System Language</label>
                                        <select className="admin-panel-setting-select">
                                            <option value="">Select Language</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-panel-setting-section">
                                    <div className="file-upload-container">
                                        <label className="file-upload-label" style={{ fontSize: '1.2rem' }}>Restaurant Logo <span>(optional)</span></label>
                                        <p className="file-upload-recommendation" style={{ marginBottom: '1rem' }}>Recommended resolution 100x100</p>

                                        <div className="file-upload-box">
                                            {file ? (
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt="uploaded logo"
                                                    className="uploaded-image"
                                                />
                                            ) : (
                                                <div className="upload-placeholder">
                                                    <svg className="upload-icon" viewBox="0 0 24 24" fill="none">
                                                        {/* Insert SVG code here */}
                                                        <path d="M5 17v2h14v-2H5zm7-8L8.5 11.5 10 13l3-3-3-3L8.5 7.5 12 11zM12 2l1.5 1.5L16 7h-2v6h-2V7H9.5L12 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        <label className="upload-btn">
                                            <input type="file" onChange={handleFileChange} />
                                            <span className="upload-btn-text">
                                                <img src="/settings-imgs/upload.svg" alt="" />
                                                Upload
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>



                            <div className="admin-panel-setting-section" id='payments'>
                                <div className="admin-panel-setting-section-left">
                                    <h2 className="admin-panel-setting-title">Payments</h2>
                                    <p className="admin-panel-setting-subtitle">Accepted Payment Methods</p>
                                    <div className="admin-panel-setting-row">
                                        <label>Accepted Payment Methods</label>
                                        <div className="admin-panel-setting-payment-options" style={{ marginTop: '5px' }}>
                                            <label><input type="checkbox" /> Cash</label>
                                            <label><input type="checkbox" /> UPI</label>
                                            <label><input type="checkbox" /> Credit Card</label>
                                            <label><input type="checkbox" /> Debit Card</label>
                                            <label><input type="checkbox" defaultChecked /> Facepae</label>
                                        </div>
                                    </div>

                                    <div className="admin-panel-setting-row">
                                        <label>Payment Gateway Integration</label>
                                        <input type="text" className="admin-panel-setting-input" placeholder="Facepae API" />
                                    </div>

                                    <label>Tax Settings</label>
                                    <div className="admin-panel-setting-row">
                                        <input type="text" className="admin-panel-setting-tax-input" placeholder='Name' />
                                        <input type="number" className="admin-panel-setting-tax-input" placeholder="%" />
                                    </div>
                                    <div className="admin-panel-setting-row">
                                        <input type="text" className="admin-panel-setting-tax-input" placeholder='Name' />
                                        <input type="number" className="admin-panel-setting-tax-input" placeholder="%" />
                                    </div>
                                    <div className="admin-panel-setting-row">
                                        <input type="text" className="admin-panel-setting-tax-input" placeholder='Name' />
                                        <input type="number" className="admin-panel-setting-tax-input" placeholder="%" />
                                    </div>
                                </div>
                                <div className="admin-panel-setting-section">
                                    <div className="file-upload-container">
                                        <label className="file-upload-label" style={{ fontSize: '1.2rem' }}>Upload QR Payment Code</label>
                                        <p className="file-upload-recommendation" style={{ marginBottom: '1rem' }}>QR will be shown in payment screen of customers</p>

                                        <div className="file-upload-box">
                                            {qrfile ? (
                                                <img
                                                    src={URL.createObjectURL(qrfile[0])}
                                                    alt="uploaded QR code"
                                                    className="uploaded-image"
                                                />
                                            ) : (
                                                <img
                                                    src="/settings-imgs/image 23.svg"
                                                    alt="initial QR code"
                                                    className="uploaded-image"
                                                />
                                            )}
                                        </div>

                                        <label className="upload-btn">
                                            <input type="file" onChange={handleQRFileChange} />
                                            <span className="upload-btn-text">
                                                Upload/Cancel
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="admin-panel-setting-section-3" id='notifications'>
                                <h2 className="admin-panel-setting-title">Notification Preferences</h2>
                                <p>Toggle between on and off</p>

                                <div className="admin-panel-setting-toggle">
                                    <label>New Order Notification</label>
                                    <label className="admin-panel-setting-switch">
                                        <input
                                            type="checkbox"
                                            checked={newOrderNotification}
                                            onChange={() => setNewOrderNotification(!newOrderNotification)}
                                        />
                                        <span className="admin-panel-setting-slider"></span>
                                    </label>
                                </div>

                                <div className="admin-panel-setting-toggle">
                                    <label>New Order Sound Alert</label>
                                    <label className="admin-panel-setting-switch">
                                        <input
                                            type="checkbox"
                                            checked={newOrderSoundAlert}
                                            onChange={() => setNewOrderSoundAlert(!newOrderSoundAlert)}
                                        />
                                        <span className="admin-panel-setting-slider"></span>
                                    </label>
                                </div>

                                <div className="admin-panel-setting-toggle">
                                    <label>Order Delay Notification</label>
                                    <label className="admin-panel-setting-switch">
                                        <input
                                            type="checkbox"
                                            checked={orderDelayNotification}
                                            onChange={() => setOrderDelayNotification(!orderDelayNotification)}
                                        />
                                        <span className="admin-panel-setting-slider"></span>
                                    </label>
                                </div>

                                <div className="admin-panel-setting-toggle">
                                    <label>Order Delay Sound Alert</label>
                                    <label className="admin-panel-setting-switch">
                                        <input
                                            type="checkbox"
                                            checked={orderDelaySoundAlert}
                                            onChange={() => setOrderDelaySoundAlert(!orderDelaySoundAlert)}
                                        />
                                        <span className="admin-panel-setting-slider"></span>
                                    </label>
                                </div>

                                <div className="admin-panel-setting-toggle">
                                    <label>Send summary reports to the registered email</label>
                                    <label className="admin-panel-setting-switch">
                                        <input
                                            type="checkbox"
                                            checked={emailSummary}
                                            onChange={() => setEmailSummary(!emailSummary)}
                                        />
                                        <span className="admin-panel-setting-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="admin-panel-setting-section-4" id='security'>
                                <h2 className="admin-panel-setting-title">Security</h2>

                                <div className="admin-panel-setting-row-4">
                                    <label>Change Password</label>
                                    <div className="admin-panel-change-pass">
                                        <input type="password" placeholder="Enter Current Password" />
                                        <input type="password" placeholder="Enter New Password" />
                                        <button>Save</button>
                                        {/* <img src="/settings-imgs/tabler_lock.svg" alt="" /> */}
                                    </div>

                                </div>

                                <div className="admin-panel-setting-mfa">
                                    <button><img src="/settings-imgs/tabler_lock.svg" alt="" />Enable multi factor Authentication</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}

export default Setting;