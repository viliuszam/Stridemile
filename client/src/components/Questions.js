import React from 'react';
import { useOutletContext, Link, Navigate } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const Footer = () => {
  return (
  <div>
        <Accordion defaultExpanded className='py-3'>
          <AccordionSummary
            expandIcon={<i className="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <b>What can I do on StrideMile?</b>
          </AccordionSummary>
          <AccordionDetails>
            You can join groups, where people motivate each other to reach mutual goals and challenges, take part in events. You can also complete individual achievements and track your health.
          </AccordionDetails>
        </Accordion>
        <Accordion className='py-3'>
          <AccordionSummary
            expandIcon={<i className="fa-solid fa-chevron-down"></i>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <b>Is the platform free to use?</b>
          </AccordionSummary>
          <AccordionDetails>
            Yes, at the moment there are no hidden costs.
          </AccordionDetails>
        </Accordion>
        <Accordion className='py-3'>
          <AccordionSummary
            expandIcon={<i className="fa-solid fa-chevron-down"></i>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <b>Should I use the same account for website and mobile app?</b>
          </AccordionSummary>
          <AccordionDetails>
            Yes. StrideMile is cross-platform, therefore, users should use the same account on any device.
          </AccordionDetails>
        </Accordion>
        <Accordion className='py-3'>
          <AccordionSummary
            expandIcon={<i className="fa-solid fa-chevron-down"></i>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <b>Can I invite my friends to the group I am a member of?</b>
          </AccordionSummary>
          <AccordionDetails>
            If you are the mentor of the group, yes, you can. In other cases, you should contact your group mentor.
          </AccordionDetails>
        </Accordion>
        <Accordion className='py-3'>
          <AccordionSummary
            expandIcon={<i className="fa-solid fa-chevron-down"></i>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <b>Why should I join StrideMile community?</b>
          </AccordionSummary>
          <AccordionDetails>
          To elevate your physical activity, find motivation, and enhance your health through engaging interactions with like-minded individuals.
          </AccordionDetails>
        </Accordion>
        <Accordion className='py-3'>
          <AccordionSummary
            expandIcon={<i className="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <b>Who can create a group?</b>
          </AccordionSummary>
          <AccordionDetails>
            Any user with motivation to unite people in physical activity.
          </AccordionDetails>
        </Accordion>
  </div>

  );
};

export default Footer;
