import React from 'react';
 
const ResultCard = (props) => {
    const {Title: title, uri} = props.result;
    const {tpthumbnailuri: imgUrl, tpcategorie: category, tppays: country, tpformat: format, tpdisponibilite: dispo, tpprixnum: price} = props.result.raw;

    return (
        <div className='result-card'>
            <a 
                href={uri}
                target='_blank'
                className='result-card__content'>
                <h3 className='result__tl'>{title}</h3>
                <img className='result__img' src={imgUrl} />
                <div className='tags'>
                    <span>{category} | </span>
                    <span>{country} | </span>
                    <span>{format} | </span>
                    <span>{dispo}</span>
                    <span className='price-tag'>
                        Prix: {price} $
                    </span>
                </div>
                <div className='results-action'>
                    <span className='learn-more'>
                        En savoir plus
                    </span>
                </div>
            </a>
        </div>
    )
}

export default ResultCard;