import cardimg from "../images/card-bg.jpg"

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
                  © SZYMANSKICODE 2020 - {year}
                </strong>
              </p>
            </div>
          </div>
        </footer>
        <img src={cardimg} alt="cardbg" style={{ height: "1px", width: "100%", opacity: "0%" }} />
      </div>
    </>
  );
};

export default Footer;
