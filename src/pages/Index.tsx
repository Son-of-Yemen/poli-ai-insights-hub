
import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Brain, TrendingUp, FileText, Users, Search, Filter, Moon, Sun, Loader2 } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/use-toast";

// Lazy load components for better performance
const ArticleAnalyzer = lazy(() => import("@/components/ArticleAnalyzer").then(module => ({ default: module.ArticleAnalyzer })));
const TrendVisualization = lazy(() => import("@/components/TrendVisualization").then(module => ({ default: module.TrendVisualization })));
const SourceManager = lazy(() => import("@/components/SourceManager").then(module => ({ default: module.SourceManager })));
const PoliticalInsights = lazy(() => import("@/components/PoliticalInsights").then(module => ({ default: module.PoliticalInsights })));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
    <span className="ml-3 text-slate-400">جاري التحميل...</span>
  </div>
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [activeTab, setActiveTab] = useState("dashboard");
  const { theme, toggleTheme, isLoading: themeLoading } = useTheme();
  const { toast } = useToast();
  
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
      source: "الجزيرة",
      sentiment: "neutral",
      confidence: 89,
      timestamp: "منذ ساعتين",
      timestampEn: "2 hours ago",
      topics: ["الدبلوماسية", "عملية السلام", "السياسة الإقليمية"],
      topicsEn: ["Diplomacy", "Peace Process", "Regional Politics"],
      summary: "Recent diplomatic efforts show renewed momentum in regional peace initiatives...",
      summaryAr: "تظهر الجهود الدبلوماسية الأخيرة زخماً متجدداً في مبادرات السلام الإقليمية مع تركيز متزايد على الحوار البناء..."
    },
    {
      id: 2,
      title: "European Union Climate Policy Changes",
      titleAr: "تغييرات سياسة المناخ في الاتحاد الأوروبي",
      source: "بي بي سي",
      sentiment: "positive",
      confidence: 92,
      timestamp: "منذ 4 ساعات",
      timestampEn: "4 hours ago",
      topics: ["سياسة المناخ", "السياسة الأوروبية", "البيئة"],
      topicsEn: ["Climate Policy", "European Politics", "Environment"],
      summary: "New environmental regulations set to reshape energy policies across EU member states...",
      summaryAr: "اللوائح البيئية الجديدة ستعيد تشكيل سياسات الطاقة عبر دول الاتحاد الأوروبي مع التركيز على الطاقة المتجددة..."
    }
  ]);

  // Memoize translations for better performance
  const translations = useMemo(() => ({
    ar: {
      title: "مركز الذكاء الاصطناعي للتحليل السياسي",
      subtitle: "منصة متقدمة للتحليل السياسي",
      articlesProcessed: "المقالات المعالجة",
      trendsIdentified: "الاتجاهات المحددة",
      sourcesMonitored: "المصادر المراقبة",
      aiConfidence: "ثقة الذكاء الاصطناعي",
      searchPlaceholder: "البحث في التحليلات السياسية...",
      filters: "المرشحات",
      dashboard: "لوحة التحكم",
      analysis: "التحليل",
      trends: "الاتجاهات",
      sources: "المصادر",
      insights: "الإحصائيات",
      recentAnalyses: "التحليلات الأخيرة",
      recentAnalysesDesc: "نتائج التحليل السياسي المدعوم بالذكاء الاصطناعي الأحدث",
      quickActions: "الإجراءات السريعة",
      quickActionsDesc: "إدارة سير عمل التحليل السياسي الخاص بك",
      runNewAnalysis: "تشغيل تحليل جديد",
      addNewSource: "إضافة مصدر جديد",
      generateReport: "إنشاء تقرير",
      politicalEntities: "الكيانات السياسية"
    },
    en: {
      title: "Political AI Insights Hub",
      subtitle: "Advanced Political Analysis Platform",
      articlesProcessed: "Articles Processed",
      trendsIdentified: "Trends Identified",
      sourcesMonitored: "Sources Monitored",
      aiConfidence: "AI Confidence",
      searchPlaceholder: "Search political analyses...",
      filters: "Filters",
      dashboard: "Dashboard",
      analysis: "Analysis",
      trends: "Trends",
      sources: "Sources",
      insights: "Insights",
      recentAnalyses: "Recent Analyses",
      recentAnalysesDesc: "Latest AI-powered political analysis results",
      quickActions: "Quick Actions",
      quickActionsDesc: "Manage your political analysis workflow",
      runNewAnalysis: "Run New Analysis",
      addNewSource: "Add New Source",
      generateReport: "Generate Report",
      politicalEntities: "Political Entities"
    }
  }), []);

  const t = translations[selectedLanguage as keyof typeof translations];

  // Handle search with debouncing
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        console.log('Searching for:', searchQuery);
        // Here you would implement actual search functionality
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    
    toast({
      title: lang === 'ar' ? "تم تغيير اللغة" : "Language Changed",
      description: lang === 'ar' ? "تم تطبيق اللغة العربية" : "Applied English language",
    });
  };

  // Handle quick actions
  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    toast({
      title: selectedLanguage === 'ar' ? "تم تنفيذ الإجراء" : "Action Executed",
      description: selectedLanguage === 'ar' ? `تم تنفيذ: ${action}` : `Executed: ${action}`,
    });
  };

  if (themeLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white" dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{t.title}</h1>
                <p className="text-sm text-slate-400">{t.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-1">
                <Button
                  variant={selectedLanguage === "en" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleLanguageChange("en")}
                  className="text-xs"
                >
                  EN
                </Button>
                <Button
                  variant={selectedLanguage === "ar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleLanguageChange("ar")}
                  className="text-xs"
                >
                  AR
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="hover:bg-slate-700/50"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-blue-400 text-sm">
                <FileText className="h-4 w-4 mr-2" />
                {t.articlesProcessed}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.articlesProcessed.toLocaleString(selectedLanguage === 'ar' ? 'ar-SA' : 'en-US')}</div>
              <p className="text-xs text-slate-400">
                {selectedLanguage === 'ar' ? '+127 اليوم' : '+127 today'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-green-400 text-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                {t.trendsIdentified}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.trendsIdentified}</div>
              <p className="text-xs text-slate-400">
                {selectedLanguage === 'ar' ? '+3 هذا الأسبوع' : '+3 this week'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-purple-400 text-sm">
                <Globe className="h-4 w-4 mr-2" />
                {t.sourcesMonitored}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.sourcesMonitored}</div>
              <p className="text-xs text-slate-400">
                {selectedLanguage === 'ar' ? 'عبر 8 لغات' : 'Across 8 languages'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-orange-400 text-sm">
                <Brain className="h-4 w-4 mr-2" />
                {t.aiConfidence}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.confidenceScore}%</div>
              <p className="text-xs text-slate-400">
                {selectedLanguage === 'ar' ? 'دقة عالية' : 'High accuracy'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 transition-colors"
            />
          </div>
          <Button 
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => console.log('Filters clicked')}
          >
            <Filter className="h-4 w-4 mr-2" />
            {t.filters}
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              {t.dashboard}
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600">
              {t.analysis}
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-blue-600">
              {t.trends}
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-blue-600">
              {t.sources}
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-blue-600">
              {t.insights}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Analyses */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{t.recentAnalyses}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {t.recentAnalysesDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:bg-slate-700/50 transition-colors">
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
                        {(selectedLanguage === "ar" ? analysis.topics : analysis.topicsEn).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs bg-blue-900/50 text-blue-300">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>{analysis.source}</span>
                        <span>{selectedLanguage === "ar" ? analysis.timestamp : analysis.timestampEn}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{t.quickActions}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {t.quickActionsDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleQuickAction(t.runNewAnalysis)}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    {t.runNewAnalysis}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => handleQuickAction(t.addNewSource)}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {t.addNewSource}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => handleQuickAction(t.generateReport)}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {t.generateReport}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => handleQuickAction(t.politicalEntities)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {t.politicalEntities}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <Suspense fallback={<LoadingSpinner />}>
              <ArticleAnalyzer language={selectedLanguage} />
            </Suspense>
          </TabsContent>

          <TabsContent value="trends">
            <Suspense fallback={<LoadingSpinner />}>
              <TrendVisualization language={selectedLanguage} />
            </Suspense>
          </TabsContent>

          <TabsContent value="sources">
            <Suspense fallback={<LoadingSpinner />}>
              <SourceManager language={selectedLanguage} />
            </Suspense>
          </TabsContent>

          <TabsContent value="insights">
            <Suspense fallback={<LoadingSpinner />}>
              <PoliticalInsights language={selectedLanguage} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
