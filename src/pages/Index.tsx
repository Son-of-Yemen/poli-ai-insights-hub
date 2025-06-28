
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Brain, TrendingUp, FileText, Users, Search, Filter, Moon, Sun } from "lucide-react";
import { ArticleAnalyzer } from "@/components/ArticleAnalyzer";
import { TrendVisualization } from "@/components/TrendVisualization";
import { SourceManager } from "@/components/SourceManager";
import { PoliticalInsights } from "@/components/PoliticalInsights";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { theme, toggleTheme } = useTheme();
  
  const [analytics, setAnalytics] = useState({
    articlesProcessed: 1247,
    trendsIdentified: 34,
    sourcesMonitored: 12,
    confidenceScore: 87
  });

  const [recentAnalyses, setRecentAnalyses] = useState([
    {
      id: 1,
      title: "Middle East Peace Process: Latest Developments",
      titleAr: "عملية السلام في الشرق الأوسط: آخر التطورات",
      source: "Al Jazeera",
      sentiment: "neutral",
      confidence: 89,
      timestamp: "2 hours ago",
      topics: ["Diplomacy", "Peace Process", "Regional Politics"],
      summary: "Recent diplomatic efforts show renewed momentum in regional peace initiatives...",
      summaryAr: "تظهر الجهود الدبلوماسية الأخيرة زخماً متجدداً في مبادرات السلام الإقليمية..."
    },
    {
      id: 2,
      title: "European Union Climate Policy Changes",
      titleAr: "تغييرات سياسة المناخ في الاتحاد الأوروبي",
      source: "BBC",
      sentiment: "positive",
      confidence: 92,
      timestamp: "4 hours ago",
      topics: ["Climate Policy", "European Politics", "Environment"],
      summary: "New environmental regulations set to reshape energy policies across EU member states...",
      summaryAr: "اللوائح البيئية الجديدة ستعيد تشكيل سياسات الطاقة عبر دول الاتحاد الأوروبي..."
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Political AI Insights Hub</h1>
                <p className="text-sm text-slate-400">
                  {selectedLanguage === "ar" ? "مركز الذكاء الاصطناعي للتحليل السياسي" : "Advanced Political Analysis Platform"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-1">
                <Button
                  variant={selectedLanguage === "en" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedLanguage("en")}
                  className="text-xs"
                >
                  EN
                </Button>
                <Button
                  variant={selectedLanguage === "ar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedLanguage("ar")}
                  className="text-xs"
                >
                  AR
                </Button>
              </div>
              
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-blue-400">
                <FileText className="h-4 w-4 mr-2" />
                Articles Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.articlesProcessed.toLocaleString()}</div>
              <p className="text-xs text-slate-400">+127 today</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trends Identified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.trendsIdentified}</div>
              <p className="text-xs text-slate-400">+3 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-purple-400">
                <Globe className="h-4 w-4 mr-2" />
                Sources Monitored
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.sourcesMonitored}</div>
              <p className="text-xs text-slate-400">Across 8 languages</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-orange-400">
                <Brain className="h-4 w-4 mr-2" />
                AI Confidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.confidenceScore}%</div>
              <p className="text-xs text-slate-400">High accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={selectedLanguage === "ar" ? "البحث في التحليلات السياسية..." : "Search political analyses..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Analyses */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Analyses</CardTitle>
                  <CardDescription className="text-slate-400">
                    Latest AI-powered political analysis results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-white text-sm leading-relaxed">
                          {selectedLanguage === "ar" ? analysis.titleAr : analysis.title}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            analysis.sentiment === 'positive' ? 'border-green-400 text-green-400' :
                            analysis.sentiment === 'negative' ? 'border-red-400 text-red-400' :
                            'border-yellow-400 text-yellow-400'
                          }`}
                        >
                          {analysis.confidence}%
                        </Badge>
                      </div>
                      
                      <p className="text-slate-400 text-xs mb-3 leading-relaxed">
                        {selectedLanguage === "ar" ? analysis.summaryAr : analysis.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {analysis.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs bg-blue-900/50 text-blue-300">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>{analysis.source}</span>
                        <span>{analysis.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage your political analysis workflow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Brain className="h-4 w-4 mr-2" />
                    Run New Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Globe className="h-4 w-4 mr-2" />
                    Add New Source
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Users className="h-4 w-4 mr-2" />
                    Political Entities
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <ArticleAnalyzer language={selectedLanguage} />
          </TabsContent>

          <TabsContent value="trends">
            <TrendVisualization language={selectedLanguage} />
          </TabsContent>

          <TabsContent value="sources">
            <SourceManager language={selectedLanguage} />
          </TabsContent>

          <TabsContent value="insights">
            <PoliticalInsights language={selectedLanguage} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
