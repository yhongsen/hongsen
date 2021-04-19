import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Collection = ({ albums }) => {


    return (
        <div className="content-container">
            <div className="collection-wrapper">
                {albums.map(({ frontmatter }) => {
                    return (
                        <Link to={frontmatter.slug} key={frontmatter.slug}>
                            <GatsbyImage image={getImage(frontmatter.hero)} alt={frontmatter.title} />
                            <div className="collection-description">
                                <h2 className="collection-header">{frontmatter.title}</h2>
                                <div className="collection-subheader">{frontmatter.tags}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

// //destructure albums into slug, title, date, image
// const CollectionGallery = ({ albums, columns }) => {
//     // iterate through everything while generating the <GatsbyImages />, then do render call
//     // can also destructure frontmatter at the input
//     const images = albums.map(({ frontmatter }) => ({ alt: frontmatter.title, image: frontmatter.hero }));
//     // const imageStyle = {
//     //     position: 'absolute',
//     //     width: '100%',
//     //     height: '100%',
//     //     top: 0,
//     //     left: 0
//     // };

//     //style={imageStyle}

//     return (
//         <Gallery images={images} columns={columns}>
//             {albums.map(({ frontmatter }) => {
//                 return (
//                     <Link to={frontmatter.slug} key={frontmatter.hero.id}>
//                         <div className={"test-wrapper"}>
//                             <GatsbyImage image={getImage(frontmatter.hero)} alt={frontmatter.title} className={"collection-image"} />
//                             <h2 className={"collection-header"}>{frontmatter.title}</h2>
//                             <small className={"collection-header"}>{frontmatter.date}</small>
//                         </div>
//                     </Link>
//                 );
//             })}
//         </Gallery>
//     );
// };


export default Collection;