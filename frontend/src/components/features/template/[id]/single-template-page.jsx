// import { getTemplate } from "@/lib/api/templates";
import SingleTemplate from "./_components/SingleTemplate";

const SingleTemplatePage = ({ params }) => {
	// const { id } = params;

	// const templateData = await getTemplate(id);
	// if (!templateData.success) {
	// 	return (
	// 		<div className='flex items-center justify-center w-full'>
	// 			There is no such page existed, please try again.
	// 		</div>
	// 	);
	// }
	// return <SingleTemplate templateData={templateData?.data} />;
	return <SingleTemplate templateData={{}} />;

};

export default SingleTemplatePage;
