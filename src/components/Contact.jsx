import React from "react";

export default function Contact() {
    return (
        <div className="contact-container" style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width:"98%"}}>
            {/* Section 1 */}
            <div className="contact-section" style={{textAlign: "center"}}>
                <img src="src/assets/images/saif.jpg" alt="Student 1" className="contact-photo" style={{height:"150px", width:"150px"}}/>
                <p><strong>Name:</strong> Md Saif</p>
                <p><strong>Portfolio:</strong> <a href=">mdsaif98m@gmail.com" target="_blank" rel="noopener noreferrer">mdsaifin.github.io</a></p>
                <p><strong>Email:</strong> mdsaif98m@gmail.com</p>
                <p><strong>Phone:</strong> +91 9308073143</p>
                <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/mdsaif-in" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/mdsaif-in</a></p>
            </div>

            {/* Section 2 */}
            <div className="contact-section" style={{textAlign: "center"}}>
                <img src="src/assets/images/Prateek.jpg" alt="Student 2" className="contact-photo" style={{height:"150px", width:"150px"}}/>
                <p><strong>Name:</strong> Prateek Kumar</p>
                <p><strong>Portfolio:</strong> <a href="http://prateek1833.github.io/" target="_blank" rel="noopener noreferrer">http://prateek1833.github.io/</a></p>
                <p><strong>Email:</strong> kumarprateek1833@gmail.com</p>
                <p><strong>Phone:</strong> +91 6391837992</p>
                <p><strong>LinkedIn:</strong> <a href="www.linkedin.com/in/kumarprateek1833" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/kumarprateek1833</a></p>
            </div>

            {/* Section 3 */}
            <div className="contact-section" style={{textAlign: "center"}}>
                <img src="src/assets/images/samah.jpeg" alt="Student 3" className="contact-photo" style={{height:"150px", width:"150px"}} />
                <p><strong>Name:</strong> Samah Wani</p>
                <p><strong>Portfolio:</strong> <a href="www.linkedin.com/in/samah-wani-ab07a6249/">www.linkedin.com/in/samah-wani-ab07a6249/</a></p>
                <p><strong>Email:</strong> samah_2021bece024@nitsri.ac.in</p>
                <p><strong>Phone:</strong> +91 7889475702</p>
                <p><strong>LinkedIn:</strong> <a href="www.linkedin.com/in/samah-wani-ab07a6249/" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/samah-wani-ab07a6249/</a></p>
            </div>
        </div>
    );
}