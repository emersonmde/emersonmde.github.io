import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faCode, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

config.autoAddCss = false

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name   
            summary
          }
          social {
            linkedin
            photography
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const linkedin = data.site.siteMetadata?.social?.linkedin;
  const photography = data.site.siteMetadata?.social?.photography;

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.jpeg"
        width={70}
        height={70}
        quality={95}
        alt="Profile picture of Matthew Emerson"
      />
      {author?.name && (
        <div className="bio-content">
          <h3>{author.name}</h3>
          <p className="bio-tagline">{author.summary}</p>
          <div className="bio-links">
            <a href="https://github.com/emersonmde" target="_blank" rel="noopener">
              <FontAwesomeIcon icon={faCode} size="1x" />
            </a>
            <a href={photography} target="_blank" rel="noopener">
              <FontAwesomeIcon icon={faCamera} size="1x" />
            </a>
            <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio
