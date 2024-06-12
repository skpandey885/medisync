import { useEffect, useRef, useState } from "react";
import { IoSearchOutline, IoCloseCircleSharp , IoReload} from "react-icons/io5";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
const MultiSelect = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef(null);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  const symptoms = [
    'itching',
    'skin_rash',
    'nodal_skin_eruptions',
    'continuous_sneezing',
    'shivering',
    'chills',
    'joint_pain',
    'stomach_pain',
    'acidity',
    'ulcers_on_tongue',
    'muscle_wasting',
    'vomiting',
    'burning_micturition',
    'spotting_ urination',
    'fatigue',
    'weight_gain',
    'anxiety',
    'cold_hands_and_feets',
    'mood_swings',
    'weight_loss',
    'restlessness',
    'lethargy',
    'patches_in_throat',
    'irregular_sugar_level',
    'cough',
    'high_fever',
    'sunken_eyes',
    'breathlessness',
    'sweating',
    'dehydration',
    'indigestion',
    'headache',
    'yellowish_skin',
    'dark_urine',
    'nausea',
    'loss_of_appetite',
    'pain_behind_the_eyes',
    'back_pain',
    'constipation',
    'abdominal_pain',
    'diarrhoea',
    'mild_fever',
    'yellow_urine',
    'yellowing_of_eyes',
    'acute_liver_failure',
    'fluid_overload',
    'swelling_of_stomach',
    'swelled_lymph_nodes',
    'malaise',
    'blurred_and_distorted_vision',
    'phlegm',
    'throat_irritation',
    'redness_of_eyes',
    'sinus_pressure',
    'runny_nose',
    'congestion',
    'chest_pain',
    'weakness_in_limbs',
    'fast_heart_rate',
    'pain_during_bowel_movements',
    'pain_in_anal_region',
    'bloody_stool',
    'irritation_in_anus',
    'neck_pain',
    'dizziness',
    'cramps',
    'bruising',
    'obesity',
    'swollen_legs',
    'swollen_blood_vessels',
    'puffy_face_and_eyes',
    'enlarged_thyroid',
    'brittle_nails',
    'swollen_extremeties',
    'excessive_hunger',
    'extra_marital_contacts',
    'drying_and_tingling_lips',
    'slurred_speech',
    'knee_pain',
    'hip_joint_pain',
    'muscle_weakness',
    'stiff_neck',
    'swelling_joints',
    'movement_stiffness',
    'spinning_movements',
    'loss_of_balance',
    'unsteadiness',
    'weakness_of_one_body_side',
    'loss_of_smell',
    'bladder_discomfort',
    'foul_smell_of urine',
    'continuous_feel_of_urine',
    'passage_of_gases',
    'internal_itching',
    'toxic_look_(typhos)',
    'depression',
    'irritability',
    'muscle_pain',
    'altered_sensorium',
    'red_spots_over_body',
    'belly_pain',
    'abnormal_menstruation',
    'dischromic _patches',
    'watering_from_eyes',
    'increased_appetite',
    'polyuria',
    'family_history',
    'mucoid_sputum',
    'rusty_sputum',
    'lack_of_concentration',
    'visual_disturbances',
    'receiving_blood_transfusion',
    'receiving_unsterile_injections',
    'coma',
    'stomach_bleeding',
    'distention_of_abdomen',
    'history_of_alcohol_consumption',
    'fluid_overload.1',
    'blood_in_sputum',
    'prominent_veins_on_calf',
    'palpitations',
    'painful_walking',
    'pus_filled_pimples',
    'blackheads',
    'scurring',
    'skin_peeling',
    'silver_like_dusting',
    'small_dents_in_nails',
    'inflammatory_nails',
    'blister',
    'red_sore_around_nose',
    'yellow_crust_ooze',
];

const [disease, setDisease] = useState('');
const [buttonText, setButtonText] = useState("Get Predictions")

function getRandomMilliseconds(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const handleButton = async (e) => {
console.log(selected)
    if(!selected.length){
        toast.error("Please enter the symptoms.")
        return;
    }
    
setButtonText("Fetching the server...")

setTimeout(() => {
  setButtonText("Predicting the disease...")
}, 1000);

setTimeout(async () => {
  
const url = "https://disease-prediction-model-mnss.onrender.com";

console.log(`${url}/api/v1/predict`);

    try {
        const response = await fetch(`${url}/api/v1/predict`, {
            method: 'POST', // Assuming you're making a POST request
            headers: {
                'Content-Type': 'application/json' // Assuming you're sending JSON data
            },
            body: JSON.stringify({
                "symptoms" : selected
            }) 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Handle the response data here
        // setButtonText(data)

        setDisease(data.result.predicted_disease)
        console.log(data);
    } catch (error) {
        // Handle errors here
        console.error('Error:', error);
    }
}, getRandomMilliseconds(2000, 4000));


};

useEffect(() => {

  if(disease && disease.length){
    setButtonText("Get Predictions")
  }
}, [disease])

  const filteredsymptoms = symptoms.filter(
    (item) =>
      item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.includes(item)
  );

  const isDisable =
    !query?.trim() ||
    selected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length;

  return (
    <>
   { !(disease && disease.length) ? (
<div className="">
    <span > Enter the symptoms you are experiencing (commas separated)</span>
    <div className="grid w-50 ">
      <div className="relative text-sm h-96">
        {selected?.length ? (
          <div className="relative flex flex-wrap gap-1 p-2 mb-2 text-xs">
            {selected.map((symptom) => {
              return (
                <div
                  key={symptom}
                  className="rounded-full w-fit py-1.5 px-3 border border-gray-400  text-gray-500
                  flex items-center gap-2"
                >
             {capitalize(symptom).replaceAll("_"," ")}
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setSelected(selected.filter((i) => i !== symptom))
                    }
                  >
            <IoCloseCircleSharp size={15} color="blue"/>
                  </div>
                  
                </div>
              );
            })}
            <div className="w-full mt-3 text-left">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  setSelected([]);
                  inputRef.current?.focus();
                }}
              >
                Clear all
              </span>
            </div>
          </div>
        ) : null}
        <div className="card flex items-center justify-between p-3  gap-2.5">
        <IoSearchOutline size={20} />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Search Symptoms..."
            className="flex-1 text-sm bg-transparent caret-rose-600"
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                setSelected((prev) => [...prev, query]);
                setQuery("");
                setMenuOpen(true);
              }
            }}
          />
          <button
            className="text-lg text-blue-500 disabled:text-gray-300 disabled:cursor-not-allowed"
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              setSelected((prev) => [...prev, query]);
              setQuery("");
              inputRef.current?.focus();
              setMenuOpen(true);
            }}
          >
            + 
          </button>
        </div>

        {/* Menu's */}
        {menuOpen ? (
          <div className="absolute flex w-full p-1 overflow-y-auto rounded-md bg-gray-50 card max-h-52 scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
            <ul className="w-full">
              {filteredsymptoms?.length ? (
                filteredsymptoms.map((symptom, i) => (
                  <li
                    key={symptom}
                    className="w-full p-2 cursor-pointer rounded-xl hover:bg-blue-50 hover:text-blue-500"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelected((prev) => [...prev, symptom]);
                      setQuery("");
                    }}
                  >
                    {capitalize(symptom).replaceAll("_"," ")}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No options available</li>
              )}
            </ul>
            
          </div>
        ) : null}

    {(!menuOpen ) &&
        (<div className='h-[250px] ml-[42%]'>
        <a href="#_" className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-blue-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group" onClick={handleButton}>
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-600 group-hover:h-full"></span>
        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">{buttonText}</span>
        </a>
        
        </div>) 
    }
      </div>
    </div>

    </div>
  ) : (
    <div className="h-[400px]"> 
 <p class="mb-2 text-slate-600">
  <span class="animate-fade-in-left rounded-lg text-3xl font-normal">

  Based on the symptoms provided, there are high chances you're suffering from <span className="font-bold text-red-400 underline ">{disease}</span>. Please consult the
  <Link to="/browse/doctors" className="text-blue-500"> doctor. 
  </Link>
  </span>
</p>

<IoReload color="blue" cursor={"pointer"} className="ml-[40%] mt-5" onClick={()=>{
   window.location.reload(); 
}} size={40}/>


    </div>
  )}

   </>
  );
};

export default MultiSelect;