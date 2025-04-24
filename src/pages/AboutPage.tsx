import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-primary-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/2159146/pexels-photo-2159146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Coffee farm" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container-custom relative z-10 py-20 md:py-28 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Story
          </motion.h1>
          <motion.p 
            className="text-lg text-primary-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            From bean to cup, discover the passion and commitment behind Anak Cafe
          </motion.p>
        </div>
      </div>
      
      {/* Origin Story */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold font-serif text-primary-800 mb-6">Our Beginnings</h2>
              <p className="text-gray-600 mb-4">
                Anak Cafe was born from a simple idea: that great coffee should be accessible to everyone. 
                Founded in 2020 by Maria Santos, a third-generation coffee farmer from the highlands of 
                the Philippines, our journey began with a small roastery and a big dream.
              </p>
              <p className="text-gray-600">
                Having grown up surrounded by coffee plants and witnessing the careful cultivation 
                process firsthand, Maria developed a deep appreciation for the craft of coffee-making. 
                After years of studying sustainable farming practices and the art of roasting, she 
                decided to bridge the gap between farmers and coffee lovers by creating Anak Cafe.
              </p>
            </motion.div>
            
            <motion.div
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.pexels.com/photos/4919737/pexels-photo-4919737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Coffee roaster" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission and Values */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold font-serif text-primary-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Mission & Values
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              What drives us every day at Anak Cafe
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "We believe that exceptional coffee starts with exceptional beans. We source only the finest, ethically grown coffee beans and roast them to perfection to bring out their unique flavors."
              },
              {
                title: "Sustainability",
                description: "We're committed to sustainable practices throughout our supply chain, from supporting environmentally responsible farming to using eco-friendly packaging materials and reducing waste."
              },
              {
                title: "Community",
                description: "We believe in building strong relationships with our farmers, customers, and communities. By paying fair prices to growers and giving back to local initiatives, we strive to create positive impact."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-primary-700 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold font-serif text-primary-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The passionate people who make Anak Cafe special
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Santos",
                role: "Founder & Head Roaster",
                image: "https://images.pexels.com/photos/7583935/pexels-photo-7583935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                bio: "With 15+ years of experience in coffee farming and roasting, Maria brings passion and expertise to every batch."
              },
              {
                name: "Carlos Reyes",
                role: "Coffee Sourcer",
                image: "https://images.pexels.com/photos/1073097/pexels-photo-1073097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                bio: "Carlos travels the world to find the best coffee beans, building relationships with farmers to ensure quality and sustainability."
              },
              {
                name: "Ana Lim",
                role: "Master Barista",
                image: "https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                bio: "Award-winning barista Ana develops our brewing guides and training programs to help you get the perfect cup every time."
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary-800">{member.name}</h3>
                <p className="text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;