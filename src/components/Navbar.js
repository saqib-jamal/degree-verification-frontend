import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Navbar() {
    const { account, connectWallet } = useWeb3();
    const location = useLocation();

   const linkStyle = (path) => ({
    color: '#e8edf3',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    backgroundColor: location.pathname === path ? '#2a4d73' : '#16324f',
    border: location.pathname === path ? '1px solid #b8912f' : '1px solid transparent'
});

    const isHec = location.pathname.startsWith('/hec');
    const isUniversity = location.pathname.startsWith('/university');
    const isPublicVerify = location.pathname === '/verify';

    return (
        <nav style={{
            backgroundColor: '#0a1f38',
            padding: '16px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '3px solid #b8912f',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{display: 'flex', gap: '12px'}}>
                {isHec && (
                    <>
                        <Link to="/hec/verify" style={linkStyle('/hec/verify')}>Verify Degree</Link>
                        <Link to="/hec/owner" style={linkStyle('/hec/owner')}>Owner Panel</Link>
                    </>
                )}
                {isUniversity && (
                    <>
                        <Link to="/university/verify" style={linkStyle('/university/verify')}>Verify Degree</Link>
                        <Link to="/university/registration" style={linkStyle('/university/registration')}>Degree Registration</Link>
                    </>
                )}
                {isPublicVerify && (
                    <span style={{color: '#ffffff', fontWeight: 'bold'}}>Degree Verification Portal</span>
                )}
            </div>
            {!isPublicVerify && (
                account 
                    ? <span style={{color: '#d9c37a', fontSize: '0.9rem'}}>
                        Connected: {account.slice(0,6)}...{account.slice(-4)}
                      </span>
                    : <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </nav>
    );
}

export default Navbar;