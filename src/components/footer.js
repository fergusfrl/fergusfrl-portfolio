import React from "react"

import { FaFacebook, FaLinkedin, FaGithub, FaRegEnvelope } from "react-icons/fa"

const SOCIAL_MEDIA = [
  {
    id: "Facebook",
    to: "https://www.facebook.com/fergus.farrell.12",
    icon: <FaFacebook />,
  },
  {
    id: "linkedIn",
    to: "https://www.linkedin.com/in/fergusfrl/",
    icon: <FaLinkedin />,
  },
  { id: "GitHub", to: "https://github.com/fergusfrl", icon: <FaGithub /> },
  { id: "Email", to: "mailto:fergusfrl@gmail.com", icon: <FaRegEnvelope /> },
]

const Footer = () => {
  return (
    <>
      <div className="contact">
        <h1>Let's have a chat. Come find me on the web.</h1>
        <div className="socialMediaIcons">
          {SOCIAL_MEDIA.map(socialMedia => (
            <a
              className="iconSM"
              href={socialMedia.to}
              target="_blank"
              rel="noopener noreferrer"
              key={socialMedia.id}
            >
              {socialMedia.icon}
            </a>
          ))}
        </div>
      </div>
      <footer>Fergus Farrell | {new Date().getFullYear()}</footer>
    </>
  )
}

export default Footer
