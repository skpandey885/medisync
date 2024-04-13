import React from 'react'
import {BsArrowRight} from 'react-icons/bs'
const HealthcareConferences = () => {
    const conferences = [
        { date: "14 Apr", conferenceList: "National Conference on Medical and Health Sciences (NCMHS) | National conference", venue: "Chandigarh, India", desc: "Join leading minds in the medical and health sciences at the National Conference on Medical and Health Sciences (NCMHS) in Chandigarh, India on April 14. Explore cutting-edge research and advancements. ",url : "https://conferencealerts.co.in/event/2481339"},
        { date: "14 Apr", conferenceList: "National Conference on Medical and Health Sciences (NCMHS) | National conference", venue: "Bhubaneswar, India" , desc:"Dive into the latest developments in medical and health sciences at the National Conference on Medical and Health Sciences (NCMHS) in Bhubaneswar, India on April 14. Don't miss this opportunity to network and learn.", url: "https://conferencealerts.co.in/event/2481381"},
        { date: "14 Apr", conferenceList: "National Conference on Medical and Health Sciences (NCMHS) | National conference", venue: "Udaipur, India",desc:"Explore emerging trends and breakthroughs in the medical and health sciences field at the National Conference on Medical and Health Sciences (NCMHS) in Udaipur, India on April 14. Engage with experts and peers.", url: "https://conferencealerts.co.in/event/2481423" },
        { date: "20 Apr", conferenceList: "International Conference on Medical, Biological and Pharmaceutical Sciences", venue: "Bangalore, India", desc:"The International Conference on Medical, Biological, and Pharmaceutical Sciences convenes in Bangalore, India on April 20. Join global experts to discuss innovations and research in these vital fields.",url: "https://conferencealerts.co.in/event/2479597" },
        { date: "20 Apr", conferenceList: "International Conference on Health Care Reform, Health Economics and Health Policy", venue: "Bangalore, India",desc:"Delve into discussions on health care reform, economics, and policy at the International Conference on Health Care Reform, Health Economics, and Health Policy in Bangalore, India on April 20. Gain insights from leading professionals. " , url: "https://conferencealerts.co.in/event/2479598" },
        { date: "20 Apr", conferenceList: "International Conference on Health and Medicine (ICHM) | NIER", venue: "Bangalore, India", desc:"Participate in the International Conference on Health and Medicine (ICHM) organized by NIER in Bangalore, India on April 20. Engage with diverse perspectives on health issues and medical advancements.", url: "https://conferencealerts.co.in/event/2479605" },
        { date: "21 Apr", conferenceList: "International Conference on Medical, Biological and Pharmaceutical Sciences", desc:"Join the International Conference on Medical, Biological, and Pharmaceutical Sciences in Chandigarh, India on April 21. Explore interdisciplinary research and foster collaborations." ,venue: "Chandigarh, India", url: "https://conferencealerts.co.in/event/2477988" },
      ]

    return (
        <div>
        <section className="overflow-hidden text-gray-600 body-font">
            <div className="container px-24 py-12 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">

      {  conferences.map((conference)=> {
       return(
                    <div className="flex flex-wrap py-8 md:flex-nowrap">
                    <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
                        <span className="text-lg font-semibold text-gray-700 title-font">
                            Date
                        </span>
                        <span className="mt-1 text-sm text-gray-500">{conference.date}</span>
                        <span className="mt-4 text-lg font-semibold text-gray-700 title-font">
                            Venue
                        </span>
                        <span className="mt-1 text-sm text-gray-500">{conference.venue}</span>
                        <span className="mt-4 text-lg font-semibold text-gray-700 title-font">
                            Price
                        </span>
                        <span className="mt-1 text-sm text-gray-500">Free</span>
                    </div>
                    <div className="md:flex-grow">
                        <h2 className="mb-2 text-2xl font-medium text-gray-900 title-font">
                        { conference.conferenceList}
                          </h2>
                        <p className="leading-relaxed">
                {conference.desc}
                        </p>
                        <a href={conference.url} className="inline-flex items-center mt-4 text-blue-500">
                            <span className='pr-5'>Learn More</span>
                            <BsArrowRight size={20} />
                        </a>
                    </div>
                </div>)
              
    })
    }

                         
</div>
                </div>
            </section>

        </div>
    )
}

export default HealthcareConferences