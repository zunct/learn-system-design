import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

import Sidebar from './components/layout/Sidebar';
import Introduction from './components/Introduction';
import LoadBalancerDemo from './components/LoadBalancerDemo';
import CapTheorem from './components/CapTheorem';
import DatabaseScaling from './components/DatabaseScaling';
import CachingDemo from './components/CachingDemo';
import MessageQueueDemo from './components/MessageQueueDemo';
import SoftwareArchitecture from './components/SoftwareArchitecture';
import MicroservicesPatterns from './components/MicroservicesPatterns';
import UrlShortenerCaseStudy from './components/casestudies/UrlShortenerCaseStudy';
import ChatAppCaseStudy from './components/casestudies/ChatAppCaseStudy';
import VideoStreamingCaseStudy from './components/casestudies/VideoStreamingCaseStudy';
import SaaSCaseStudy from './components/casestudies/SaaSCaseStudy';
import TicketBookingCaseStudy from './components/casestudies/TicketBookingCaseStudy';
import LocationBasedCaseStudy from './components/casestudies/LocationBasedCaseStudy';
import NewsFeedCaseStudy from './components/casestudies/NewsFeedCaseStudy';
import NotificationCaseStudy from './components/casestudies/NotificationCaseStudy';
import IdGeneratorCaseStudy from './components/casestudies/IdGeneratorCaseStudy';
import SearchEngineCaseStudy from './components/casestudies/SearchEngineCaseStudy';
import SsoCaseStudy from './components/casestudies/SsoCaseStudy';
import NetworkApis from './components/NetworkApis';
import AuthSecurity from './components/AuthSecurity';
import NetworkSecurity from './components/NetworkSecurity';
import CdnDemo from './components/CdnDemo';
import DatabaseTypes from './components/DatabaseTypes';
import ObservabilityDemo from './components/ObservabilityDemo';
import RateLimitingDemo from './components/RateLimitingDemo';
import DistributedAlgorithms from './components/DistributedAlgorithms';

import DataEngineering from './components/DataEngineering';
import SystemDesignFramework from './components/casestudies/SystemDesignFramework';
import CommonMistakesCaseStudy from './components/casestudies/CommonMistakesCaseStudy';

function App() {
  const [activeTab, setActiveTab] = useState('intro');

  const renderContent = () => {
    switch (activeTab) {
      case 'intro': return <Introduction />;
      case 'network': return <NetworkApis />;
      case 'lb': return <LoadBalancerDemo />;
      case 'cdn': return <CdnDemo />;
      case 'cap': return <CapTheorem />;
      case 'db-types': return <DatabaseTypes />;
      case 'db': return <DatabaseScaling />;
      case 'cache': return <CachingDemo />;
      case 'mq': return <MessageQueueDemo />;
      case 'arch': return <SoftwareArchitecture />;
      case 'microservices': return <MicroservicesPatterns />;
      case 'observability': return <ObservabilityDemo />;
      case 'rate-limit': return <RateLimitingDemo />;
      case 'dist-algo': return <DistributedAlgorithms />;
      case 'auth-sec': return <AuthSecurity />;
      case 'net-sec': return <NetworkSecurity />;
      case 'data-eng': return <DataEngineering />;
      case 'framework': return <SystemDesignFramework />;
      case 'common-mistakes': return <CommonMistakesCaseStudy />;
      case 'url-shortener': return <UrlShortenerCaseStudy />;
      case 'chat-app': return <ChatAppCaseStudy />;
      case 'video-streaming': return <VideoStreamingCaseStudy />;
      case 'saas-system': return <SaaSCaseStudy />;
      case 'ticket-booking': return <TicketBookingCaseStudy />;
      case 'location-based': return <LocationBasedCaseStudy />;
      case 'news-feed': return <NewsFeedCaseStudy />;
      case 'notification': return <NotificationCaseStudy />;
      case 'id-generator': return <IdGeneratorCaseStudy />;
      case 'search-engine': return <SearchEngineCaseStudy />;
      case 'sso-case': return <SsoCaseStudy />;
      default: return <Introduction />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 relative h-full overflow-hidden bg-slate-950">
        {/* Background ambient grid/glow (Static) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        {/* Scrollable Content Area */}
        <div className="absolute inset-0 overflow-y-auto scroll-smooth custom-scrollbar">
          <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-10 lg:px-12 relative z-10 min-h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-1 w-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
            
            {/* Safe area spacer at bottom for mobile/desktop */}
            <div className="h-16 shrink-0 w-full"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
