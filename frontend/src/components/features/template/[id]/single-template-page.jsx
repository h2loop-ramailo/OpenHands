import { useEffect, useState } from "react";
import { getTemplate } from "../../../../api/templates";
import SingleTemplate from "./_components/SingleTemplate";

const SingleTemplatePage = ({ params }) => {
  const { id } = params;
  const [templateData, setTemplateData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTemplate(id).then((data) => {
      if (!data.success) setError(true);
      else setTemplateData(data.data);
    });
  }, [id]);

  if (error) {
    return (
      <div className='flex items-center justify-center w-full'>
        There is no such page existed, please try again.
      </div>
    );
  }

  if (!templateData) return <div>Loading...</div>;

  return <SingleTemplate templateData={templateData} />;
};

export default SingleTemplatePage;
