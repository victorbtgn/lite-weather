import './BgSky.scss';

export default function BgSky() {
    return (
        <div className="BgSky">
          <div className='BgSky-overlay'>
            <div className="BgSky-moon"></div>
            {/* <div className="BgSky-clouds_one"></div> */}
            <div className="BgSky-clouds_two"></div>
            {/* <div className="BgSky-clouds_three"></div> */}
          </div>
        </div>
    );
  };