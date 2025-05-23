import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  url: string;
}

const ArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);
          
        if (error) {
          throw error;
        }
        
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            Sports Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest sports news, tips, and trends in Rajkot
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-12">
              No articles found. Please check back later!
            </div>
          ) : (
            articles.map((article) => (
              <Card 
                key={article.id} 
                className="overflow-hidden shadow-lg card-hover border-0 cursor-pointer" 
                onClick={() => handleArticleClick(article.url)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{article.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{article.description}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-sport-purple font-medium hover:underline">
                    Read More →
                  </span>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/articles">
            <Button variant="outline" className="border-2 border-sport-purple text-sport-purple hover:bg-sport-purple hover:text-white btn-effect px-6">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
