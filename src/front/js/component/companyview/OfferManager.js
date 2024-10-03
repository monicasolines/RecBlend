import React, { useState, useEffect, useContext } from 'react';
import OfferCard from './OfferCard';
import { Context } from '../../store/appContext.js';
import '../../component/../../styles/OfferManager.css'; 
import { useNavigate } from 'react-router-dom';


const OfferManager = ({ empleador_id }) => {
    const { store } = useContext(Context);
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const employerOffers = store.jobOffers.filter(offer => offer.empleador_id === store.user?.id);
        setOffers(employerOffers);
    }, [store.jobOffers, empleador_id]);

    const handleNavigate = () =>{
            navigate('/formoffer')
    }

    return (
        <div className='offer-manager'>
            {store.user?.profile_empleador?.id &&(
                <div className="header">
                    <button className="btn" onClick={() => handleNavigate()}>
                        Crear oferta
                    </button>
                </div>
            )}
            <div className="offer-list">
                {offers.map((offer, index) => (
                    <OfferCard
                        key={index}
                        title={offer.name}
                        description={offer.descripcion}
                        status={offer.status}
                        price={offer.salario}
                        oferta_id={offer.id}
                        onEdit={() => handleOpenModal(index)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default OfferManager;
