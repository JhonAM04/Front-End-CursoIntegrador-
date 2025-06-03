import WritingTemplate from "../shared/components/WritingTemplate"


const Activitie = () => {
  return (
    <WritingTemplate sentenceParts={[
        'I ', null, ' a ', null, '.' // Espacios para llenar con: ['am', 'student']
      ]}
      correctAnswers={['am', 'student']} />
  )
}

export default Activitie