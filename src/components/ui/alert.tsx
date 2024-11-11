import React from 'react';

type AlertType = 'success' | 'info' | 'warning' | 'error';

type ActionType = {
      title:string,
    onClic:()=> void,
}

interface AlertProps {
  title: string;
  message: string;
  type: AlertType;
  action?:ActionType;

}

const Alert: React.FC<AlertProps> = ({ title, message, type, action }) => {
  const getStyles = (type: AlertType) => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' };
      case 'info':
        return { backgroundColor: '#d1ecf1', color: '#0c5460', borderColor: '#bee5eb' };
      case 'warning':
        return { backgroundColor: '#fff3cd', color: '#856404', borderColor: '#ffeeba' };
      case 'error':
        return { backgroundColor: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' };
      default:
        return {};
    }
  };

  const styles = {
    container: {
      padding: '10px 20px',
      borderRadius: '4px',
      border: '1px solid',
      marginBottom: '10px',
      ...getStyles(type),
    } as React.CSSProperties,
    title: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
      marginBottom: '5px',
    } as React.CSSProperties,
    message: {
      fontSize: '1rem',
    } as React.CSSProperties,
    button:{
        borderRadius:"8px"
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>{title}</div>
      <div style={styles.message}>{message}</div>
      {action && <button onClick={(e)=> {
        e.preventDefault();
        action.onClic()
      }}>{action.title}</button>}
    </div>
  );
};

export default Alert;
