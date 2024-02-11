import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

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
            <a href="https://github.com/emersonmde" target="_blank" rel="noopener noreferrer">
              {/* Use your preferred icon from a library  */}
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a href="https://memerson.dev" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio
