import { supabase } from './client';

export const setupSampleData = async () => {
  try {
    // Sample Articles
    const sampleArticles = [
      {
        title: "Cricket Fever in Rajkot: Local League Highlights",
        description: "The Rajkot Premier League continues to showcase exceptional talent as local teams battle it out for the championship. Read about the latest matches and standout performances.",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1974",
        date: "2024-03-15",
        url: "#"
      },
      {
        title: "Pickleball: The New Sports Sensation in Rajkot",
        description: "Discover why pickleball is becoming the fastest-growing sport in Rajkot. From beginners to pros, everyone is joining the craze!",
        image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1974",
        date: "2024-03-14",
        url: "#"
      },
      {
        title: "Volleyball Championship: Team Spirit at Its Best",
        description: "The annual volleyball championship brought together the best teams from across Rajkot. Experience the thrill and excitement of this year's tournament.",
        image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1974",
        date: "2024-03-13",
        url: "#"
      }
    ];

    // Sample Events
    const sampleEvents = [
      {
        title: "Rajkot Cricket League 2024",
        description: "Join the biggest cricket tournament in Rajkot! Open for all skill levels. Register your team now and compete for the championship trophy.",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1974",
        date: "2024-04-01",
        location: "Rajkot Cricket Stadium",
        participants: "16 Teams"
      },
      {
        title: "Pickleball Beginners Workshop",
        description: "New to pickleball? Join our beginner-friendly workshop and learn the basics from professional coaches. Equipment provided.",
        image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1974",
        date: "2024-03-25",
        location: "Sports Complex, Race Course",
        participants: "20 Players"
      }
    ];

    // Insert Articles
    const { error: articlesError } = await supabase
      .from('articles')
      .insert(sampleArticles);

    if (articlesError) {
      console.error('Error inserting articles:', articlesError);
    }

    // Insert Events
    const { error: eventsError } = await supabase
      .from('events')
      .insert(sampleEvents);

    if (eventsError) {
      console.error('Error inserting events:', eventsError);
    }

    console.log('Sample data setup completed');
    return true;
  } catch (error) {
    console.error('Error setting up sample data:', error);
    return false;
  }
}; 