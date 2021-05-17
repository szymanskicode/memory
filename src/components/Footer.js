const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <div className='offset'></div>
      <div className='container'>
        <footer>
          <div className='row'>
            <div className='col-12'>
              <p
                className='text-center text-muted'
                style={{ marginBottom: '8px' }}
              >
                <strong style={{ fontSize: '65%' }}>
                  © SZYMANSKICODE {year}
                </strong>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
