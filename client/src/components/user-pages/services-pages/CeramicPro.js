import React from 'react';

const CeramicPro = () => {
  return (
    <>
    <div className="ceramic--pro--container">
      <h2>Ceramic Pro</h2>
      <p id="ceramic--pro--description">Final prices DO NOT include paint correction to remove imperfections and swirls in the paintwork. All estimates performed in person.</p>
      <div className="ceramic--pro--internal">
        <p>We offer Ceramic Pro coatings for your vehicle, the ceramic coating
          technology has surpassed waxes like carnauba and paint sealants. These
          coatings are applied once and can last several years.</p>
        <p>The coating is applied to a smooth, uncontaminated surface and bonds to the
          paintwork directly. The nano technology fills the pores of the clear coat
          and lays flat along the surface to cure, essentially leaving an extra
          layer of clear coat on the vehicle.</p>
        <p style={{textDecoration: "underline"}}>The benefits of having a Nano ceramic coating are as follows:</p>
        <ul>
          <div className="ceramic--pro--flex--left">
            <li>Longevity of protection and
              enhanced paint gloss.</li>
            <li>Different levels of protection
              from 6 months to lifetime
              guarentee.</li>
            <li>9H Hardness for scratch
              resistance.</li>
            <li>Other surface coatings for
              leather, glass, rim and
              plastic coating.</li>
          </div>
          <div className="ceramic--pro--flex--right">
            <li>Carfax accredited product to
              increase resale value.</li>
            <li>Durability and protection against
              bird droppings, bug splatter, acid
              rain and chemical contaminents.</li>
            <li>Hydrophobic properties.
              (water repellent)</li>
            <li>Self cleaning properties.</li>
            <li>Deeper gloss and purity
            of the paintwork.</li>  
          </div>
        </ul>
        <table>
          <tbody>
            <tr>
              <td>Sport</td>
              <td>6 Month</td>
            </tr>
            <tr>
              <td>Bronze</td>
              <td>2 Year</td>
            </tr>
            <tr>
              <td>Silver</td>
              <td>5 Year</td>
            </tr>
            <tr>
              <td>Gold</td>
              <td>Lifetime</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CeramicPro;

// Source Services.js