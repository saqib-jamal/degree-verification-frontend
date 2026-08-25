import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Navbar() {
    const { account, connectWallet } = useWeb3();
    const location = useLocation();

    const linkStyle = {
        color: '#a0a0c0',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        backgroundColor: '#1a1a2e'
    };

    const isHec = location.pathname.startsWith('/hec');
    const isUniversity = location.pathname.startsWith('/university');
    const isPublicVerify = location.pathname === '/verify';

    return (
        <nav style={{
            backgroundColor: '#16213e',
            padding: '16px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #2a2a4a',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{display: 'flex', gap: '12px'}}>
                {isHec && (
                    <>
                        <Link to="/hec/verify" style={linkStyle}>Verify Degree</Link>
                        <Link to="/hec/owner" style={linkStyle}>Owner Panel</Link>
                    </>
                )}
                {isUniversity && (
                    <>
                        <Link to="/university/verify" style={linkStyle}>Verify Degree</Link>
                        <Link to="/university/registration" style={linkStyle}>Degree Registration</Link>
                    </>
                )}
                {isPublicVerify && (
                    <span style={{color: '#e0e0e0', fontWeight: 'bold'}}>Degree Verification Portal</span>
                )}
            </div>
            {!isPublicVerify && (
                account 
                    ? <span style={{color: '#6c63ff', fontSize: '0.9rem'}}>
                        Connected: {account.slice(0,6)}...{account.slice(-4)}
                      </span>
                    : <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </nav>
    );
}

export default Navbar;