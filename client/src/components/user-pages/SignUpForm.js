import React from 'react';

const SignUpForm = () => {
  return (
    <>
      <div className="textwidget slide--7--container bounds">
        <div id="mc_embed_signup">
          <form action="//Moorethandetailing.us14.list-manage.com/subscribe/post?u=9114fd5477701a23585c77dda&amp;id=08b705ae51" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate="" data-form-processed="true">
            <div id="mc_embed_signup_scroll">
              <h3>Join Our Discounts Program</h3>
              <p>Insiders only promotions<br/>and discounts newsletter</p>
              <br/>
              <div className="mc-field-group">
                <input 
                  type="text" 
                  defaultValue="" 
                  name="FNAME" 
                  className="required fname" 
                  id="mce-FNAME" 
                  placeholder="First Name"
                />
              </div>
              <div className="mc-field-group">
                <input 
                  type="email" 
                  defaultValue="" 
                  name="EMAIL" 
                  className="required email" 
                  id="mce-EMAIL" 
                  placeholder="Email Address"
                />
              </div>
              <br/>
              <div id="mce-responses" className="clear">
              {/* add css to change the display property */}
                <div className="response" id="mce-error-response">
                </div>
                <div className="response" id="mce-success-response">
                </div>
              </div>    
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
              <div id="b_9114fd5477701a23585c77dda_08b705ae51" aria-hidden="true">
                <input 
                  type="text" 
                  name="b_9114fd5477701a23585c77dda_08b705ae51" 
                  tabIndex={-1} 
                  defaultValue=""
                />
              </div>
              <div className="clear slide--7--btn">
                <input 
                  type="submit" 
                  value="Save Now" 
                  name="subscribe" 
                  id="mc-embedded-subscribe"
                />
              </div>
            </div>
          </form>
        </div>
      </div>    
    </>
  );
};

export default SignUpForm;

// Source HomePage.js, AboutPage.js 