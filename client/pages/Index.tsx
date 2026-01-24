import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Code,
  Database,
  Server,
  Smartphone,
  Zap,
  Coffee,
  MessageSquare,
} from "lucide-react";

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const projects = [
    {
      title: "ShopX Shopping Website",
      description: "Full-stack e-commerce application with payment integration, user authentication, and admin dashboard.",
      tech: ["Html", "Css", "Js", "MySQL", "Node.js", "Express.js"],
      image: "/logowhite.png",
      demo: "#",
      github: "https://github.com/ktejas25/ShopX-Shopping-Website"
    },
    {
      title: "Harmony Chat Application",
      description: "Discord Web chat app with servers and channels, file sharing, and real-time notifications.",
      tech: ["React", "Socket.io", "Express", "Supabase", "Tailwind"],
      image: "/harmony.png",
      demo: "#",
      github: "https://github.com/ktejas25/DiscordWeb"
    },
    {
      title: "ShopX Shopping App",
      description: "Full-stack e-commerce application with payment integration, user authentication, and admin dashboard.",
      tech: ["Android", "Firebase firestore"],
      image: "/logowhite.png",
      demo: "#",
      github: "https://github.com/ktejas25/ShopX-Shopping-App"
    },
    {
      title: "AI-Text-to-Speech",
      description: "Advanced TTS application with multiple voice models and real-time audio generation.",
      tech: ["React.js", "Vite", "Tailwind CSS", "Shadcn UI", "React-Hooks", "Web Speech API", "Node.js", "Express.js", "Rest API"],
      image: "/voiceforge.jpg",
      demo: "#",
      github: "https://github.com/ktejas25/TTS"
    }
  ];

  const skills = {
    "Frontend Development": ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript ES6+"],
    "Backend & Database": ["Node.js", "Express.js", "Python", "MySQL", "Firebase Firestore"],
    "Mobile Development": ["Android Programming"],
    "Development Tools": ["Git", "VS Code", "npm/pnpm", "Vite", "Webpack","Web3Forms"],
    "Languages": ["English", "Hindi", "Marathi (Native)"]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Web3Forms access key
    const ACCESS_KEY = "a2afd3c9-849a-41ba-8b70-9068de605274";

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ name: "", email: "", message: "" });
        alert('Thank you for your message!');
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = async () => {
    try {
      const resumeUrl = "https://cdn.builder.io/o/assets%2Fed57a3521a364a94af96120e9771ac11%2Fd1355a800fd4402cbb6fbe2e1ddc2a6e?alt=media&token=09565b85-ff21-4698-911a-8aad5c07c02a&apiKey=ed57a3521a364a94af96120e9771ac11";

      // Try to fetch the file and create a blob
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'TejasKadamResume.pdf';
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link
      window.open("https://cdn.builder.io/o/assets%2Fed57a3521a364a94af96120e9771ac11%2Fd1355a800fd4402cbb6fbe2e1ddc2a6e?alt=media&token=09565b85-ff21-4698-911a-8aad5c07c02a&apiKey=ed57a3521a364a94af96120e9771ac11", '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Tejas</div>
          
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex items-center bg-muted/50 rounded-full p-1 border border-border/50 backdrop-blur-sm">
              <button
                onClick={toggleDarkMode}
                className="theme-toggle relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 opacity-0 dark:opacity-0 light:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 dark:opacity-100 transition-opacity duration-300" />
                <Sun className={`h-5 w-5 absolute transition-all duration-300 ${darkMode ? 'rotate-90 scale-0 text-transparent' : 'rotate-0 scale-100 text-white drop-shadow-sm'}`} />
                <Moon className={`h-5 w-5 absolute transition-all duration-300 ${darkMode ? 'rotate-0 scale-100 text-white drop-shadow-sm' : '-rotate-90 scale-0 text-transparent'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Hi, I'm <span className="text-white">Tejas Kadam</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-white/90 mb-6 font-medium">
              Full-Stack Web Developer specializing in React & Node.js
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              I build modern, scalable web applications that solve real-world problems. 
              Passionate about clean code, user experience, and cutting-edge technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3"
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3"
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 text-white/30 animate-pulse">
          <Code className="h-8 w-8" />
        </div>
        <div className="absolute bottom-20 right-10 text-white/30 animate-pulse delay-1000">
          <Database className="h-8 w-8" />
        </div>
        <div className="absolute top-40 right-20 text-white/30 animate-pulse delay-500">
          <Server className="h-6 w-6" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
            
            <div className="space-y-16">
              {/* Introduction */}
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  My journey into web development began three years ago with a simple curiosity about how websites function. What started as casual experimentation with HTML and CSS soon ignited a deep passion for crafting meaningful digital experiences that address real-world problems.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Since then, I’ve dedicated countless hours to learning, building, and refining my skills. I thrive on solving complex challenges and continuously seek to push the boundaries of what’s possible with modern web technologies. Whether it’s front-end design or full-stack development, I’m driven by the opportunity to create purposeful, user-centered solutions that make a tangible impact.
                </p>

                <Button onClick={downloadResume} size="lg" className="flex items-center gap-2 mx-auto">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Experience & Expertise */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-primary" />
                      Experience & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-primary">Full-Stack Development</h4>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Specialized in modern web technologies including React, Node.js, TypeScript, and Python.
                        I build scalable applications from concept to deployment, focusing on clean code architecture,
                        user experience, and performance optimization.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        My approach combines technical expertise with creative problem-solving, ensuring that every
                        project not only functions flawlessly but also delivers an exceptional user experience.
                        I'm passionate about writing maintainable code and following industry best practices.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-primary">Current Focus</h4>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Currently completed my BBA(CA) degree while working on diverse projects ranging from
                        e-commerce platforms to real-time chat applications. This unique combination of business
                        and technical knowledge gives me a comprehensive understanding of both user needs and market requirements.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        I'm particularly interested in exploring AI integration, cloud technologies, and modern
                        development frameworks. Always eager to learn emerging technologies and adapt to the
                        ever-evolving landscape of web development.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-primary">Community & Growth</h4>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Actively contribute to open-source projects, participate in developer communities,
                        and enjoy sharing knowledge through technical writing. I believe in the power of
                        collaboration and the importance of giving back to the developer community.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        As a strong advocate for continuous learning, I stay updated with industry trends,
                        attend tech meetups, and constantly experiment with new tools and methodologies.
                        My goal is to not just keep up with technology, but to be at the forefront of innovation.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills & Technologies */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Technical Expertise
                    </CardTitle>
                    <CardDescription>
                      Modern technologies & frameworks I leverage to build exceptional applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(skills).map(([category, techs]) => (
                        <div key={category} className="space-y-3">
                          <div className="flex items-center gap-2">
                            {category === 'Frontend Development' && <Smartphone className="h-4 w-4 text-primary" />}
                            {category === 'Backend & Database' && <Server className="h-4 w-4 text-primary" />}
                            {category === 'Mobile Development' && <Code className="h-4 w-4 text-primary" />}
                            {category === 'Development Tools' && <Zap className="h-4 w-4 text-primary" />}
                            {category === 'Languages' && <MessageSquare className="h-4 w-4 text-primary" />}
                            <h4 className="font-semibold text-sm text-primary">{category}</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {techs.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs px-2 py-1 cursor-pointer transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-sm"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Here are some of my favorite projects that showcase my skills and passion for development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/ktejas25" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  View All Projects on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-muted-foreground">
                I'm always open to discussing new opportunities and interesting projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                  <div className="space-y-4">
                    <a 
                      href="mailto:ktejas0425@gmail.com" 
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary transition-colors group"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium group-hover:text-primary">Email</p>
                        <p className="text-muted-foreground">ktejas0425@gmail.com</p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/tejas-kadam-876759267/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary transition-colors group"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium group-hover:text-primary">LinkedIn</p>
                        <p className="text-muted-foreground">Connect professionally</p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://github.com/ktejas25" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary transition-colors group"
                    >
                      <Github className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium group-hover:text-primary">GitHub</p>
                        <p className="text-muted-foreground">Check out my code</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Send a Message
                  </CardTitle>
                  <CardDescription>
                    Drop me a line and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell me about your project or just say hello!"
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-muted-foreground">
                © 2025 Tejas. Built with React, TypeScript & Tailwind CSS.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" asChild>
                <a href="https://github.com/ktejas25" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" asChild>
                <a href="https://www.linkedin.com/in/tejas-kadam-876759267/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" asChild>
                <a href="mailto:ktejas0425@gmail.com">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
