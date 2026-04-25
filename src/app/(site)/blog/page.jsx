import { AImage } from '@/components/data/ArticleImage/ArticleImage';
import Link from 'next/link';

const Blog = () => {
    return (
        <div className="py-8 relative">
            <div className="relative max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {AImage.map((article) => (
                        <div key={article.id} className="bg-white rounded-lg shadow-lg p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className='flex items-center w-full'>
                                    <img
                                        src='/assets/img/section/testimonal-person-1.png'
                                        alt='daris'
                                        className="w-12 h-12 object-cover rounded-full"
                                    />
                                    <div className="flex mr-2 items-center space-x-3">
                                        <p className="my-1 text-gray-600 text-sm">Daris@</p>
                                        <div className="border-l-2 border-gray-300 h-6"></div>
                                        <p className="my-1 text-gray-600 text-sm">{article.Date}</p>
                                    </div>
                                </div>
                            </div>

                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-72 object-cover rounded-lg"
                            />

                            <div className="mt-4">
                                <h2 className="text-md font-semibold text-gray-900">{article.title}</h2>
                                <Link href={`/travelbenefits/${article.id}`}>
                                    <button className="mt-4 cursor-pointer text-white bg-orange-600 p-3 rounded-lg text-sm">
                                        ادامه مطلب
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
