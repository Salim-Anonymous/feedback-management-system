import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';

interface PostContentProps {
  title: string;
}

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabs = [
    { id: 0, title: 'Post', content: <PostContent title="Sample Post" /> },
    { id: 1, title: 'Comments', content: <div>dhdd</div> },
    { id: 2, title: 'Upvoted', content: 'Content for Tab 3' },
    { id: 3, title: 'Downvoted', content: 'Content for Tab 4' },
    { id: 4, title: 'Liked', content: 'Content for Tab 5' },
    { id: 5, title: 'Flagged', content: 'Content for Tab 6' },
  ];

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 hover ${
              activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } ${activeTab === tab.id ? 'text-sm' : 'text-base'} sm:text-base md:text-lg lg:text-xl`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <div className="mt-4">
          {tabs.map((tab) => (
            <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
              {tab.id === 0 ? (
                <div className="overflow-y-scroll max-h-96">
                  {tab.content}
                </div>
              ) : (
                tab.content
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PostContent: React.FC<PostContentProps> = ({ title }) => {
  const currentDate = new Date().toLocaleDateString();
  
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow border border-blue-300">
      <div className="flex justify-center items-center w-1/2">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-500">Posted on {currentDate}</p>
        </div>
        <span className='ml-auto'>
        <a href="#" className="text-blue-500 hover:underline flex ">
          Read More
          <ArrowRightIcon/>
        </a>
        </span>
       
      </div>
    </div>
  );
};

export default TabComponent;