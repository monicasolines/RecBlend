import React, { useContext, useEffect, useState } from 'react';
import '../../styles/CompanyProfile.css'; 
import AccordionSection from '../component/companyview/AccordionSection';
import AccordionDescription from '../component/companyview/AccordionDescripcion';
import { EditDescriptionAccordion } from '../component/companyview/DescriptionAccordion';
import OfferManager from '../component/companyview/OfferManager';
import { Context } from '../store/appContext';

export const CompanyProfile = ({ empleador_id }) => {
    const { store } = useContext(Context);
    const [companyOffer, setCompanyOffer] = useState([]);

    useEffect(() => {
        const employerOffers = store.jobOffers.filter(offer => offer.empleador_id === store.user?.id);
        setCompanyOffer(employerOffers);
    }, [store.jobOffers, empleador_id]);

    return (
        <div className="contenedor container">
            <div className='body'>
                <div className="company-profile">
                    <div className="company-header mt-5">
                        <img
                            src="https://via.placeholder.com/1200x300"
                            alt="Company Background"
                            className='company-header-bg'
                        />
                        <div className="company-info">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Company Logo"
                                className="company-info-logo"
                            />
                            <div className="company-info-details mt-5 pt-2">
                                <h2 className="company-info-name">{store.user.name}</h2>
                                <p className="company-info-location">{store.user.country}</p>
                                <p className="company-info-tagline ">{store.user.country}</p>
                            </div>
                        </div>
                    </div>

                    <div className="company-description">
                        <h3 className="company-description-title">Sobre nosotros</h3>
                        <p className="company-description-text">
                            {store.user.profile_empleador.descripcion}
                        </p>
                    </div>

                    <div className="company-careers">
                        <h3 className="company-careers-title">Trabaja con nosotros</h3>
                        <p className="company-careers-text text-muted">
                            Únete a un equipo dinámico y en crecimiento. Buscamos profesionales apasionados por la
                            tecnología, innovación y el aprendizaje continuo. En Krell Consulting, valoramos la
                            creatividad, el trabajo en equipo y el compromiso con la excelencia.
                        </p>
                    </div>

                    <div className="company-extra">
                        <h3 className="company-extra-title">Ofertas de empleo</h3>
                        <ul className="company-extra-list">
                            {companyOffer.map((offer, index) => (
                                <li key={index} className="company-extra-item">{offer.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <AccordionDescription title="Descripción">
                    <EditDescriptionAccordion />
                </AccordionDescription>

                <AccordionSection title="Ofertas">
                    <div className="d-flex flex-wrap">
                        <OfferManager />
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
};
