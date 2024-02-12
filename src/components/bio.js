import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faGlobe } from "@fortawesome/free-solid-svg-icons"
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
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author

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
            <a href="https://memerson.dev?ref=ErrorSignal" target="_blank" rel="noopener">
              <FontAwesomeIcon icon={faGlobe} size="1x" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio
