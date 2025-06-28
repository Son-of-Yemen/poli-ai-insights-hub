
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Globe, Users, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useMemo } from "react";

interface TrendVisualizationProps {
  language: string;
}

export const TrendVisualization = ({ language }: TrendVisualizationProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Memoize data to improve performance
  const timelineData = useMemo(() => [
    { month: language === 'ar' ? 'يناير' : 'Jan', diplomaticActivity: 65, tensions: 35, cooperation: 80 },
    { month: language === 'ar' ? 'فبراير' : 'Feb', diplomaticActivity: 70, tensions: 30, cooperation: 85 },
    { month: language === 'ar' ? 'مارس' : 'Mar', diplomaticActivity: 75, tensions: 25, cooperation: 90 },
    { month: language === 'ar' ? 'أبريل' : 'Apr', diplomaticActivity: 80, tensions: 40, cooperation: 75 },
    { month: language === 'ar' ? 'مايو' : 'May', diplomaticActivity: 85, tensions: 35, cooperation: 85 },
    { month: language === 'ar' ? 'يونيو' : 'Jun', diplomaticActivity: 90, tensions: 20, cooperation: 95 }
  ], [language]);

  const regionData = useMemo(() => [
    { region: language === 'ar' ? 'الشرق الأوسط' : 'Middle East', activity: 85 },
    { region: language === 'ar' ? 'أوروبا' : 'Europe', activity: 78 },
    { region: language === 'ar' ? 'آسيا والمحيط الهادئ' : 'Asia Pacific', activity: 92 },
    { region: language === 'ar' ? 'الأمريكتان' : 'Americas', activity: 67 },
    { region: language === 'ar' ? 'أفريقيا' : 'Africa', activity: 73 }
  ], [language]);

  const sentimentData = useMemo(() => [
    { name: language === 'ar' ? 'إيجابي' : 'Positive', value: 45, color: '#10B981' },
    { name: language === 'ar' ? 'محايد' : 'Neutral', value: 35, color: '#F59E0B' },
    { name: language === 'ar' ? 'سلبي' : 'Negative', value: 20, color: '#EF4444' }
  ], [language]);

  const trendingTopics = useMemo(() => [
    { topic: language === "ar" ? "السياسة الخارجية" : "Foreign Policy", mentions: 1247, trend: "+15%" },
    { topic: language === "ar" ? "التغير المناخي" : "Climate Change", mentions: 892, trend: "+23%" },
    { topic: language === "ar" ? "الأمن الإقليمي" : "Regional Security", mentions: 756, trend: "+8%" },
    { topic: language === "ar" ? "التجارة الدولية" : "International Trade", mentions: 634, trend: "+12%" },
    { topic: language === "ar" ? "حقوق الإنسان" : "Human Rights", mentions: 523, trend: "+18%" },
    { topic: language === "ar" ? "الطاقة المتجددة" : "Renewable Energy", mentions: 467, trend: "+31%" }
  ], [language]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
      console.log('Trends data refreshed');
    } catch (error) {
      console.error('Error refreshing trends:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const chartTooltipStyle = useMemo(() => ({
    backgroundColor: '#1F2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    color: '#fff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }), []);

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === "ar" ? "تصور الاتجاهات السياسية" : "Political Trends Visualization"}
          </h2>
          <p className="text-slate-400 text-sm">
            {language === "ar" 
              ? `آخر تحديث: ${lastUpdated.toLocaleString('ar-SA')}` 
              : `Last updated: ${lastUpdated.toLocaleString()}`}
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          variant="outline" 
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {language === "ar" ? "تحديث" : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Political Timeline */}
        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Calendar className="h-4 w-4 mr-2 text-blue-400" />
              {language === "ar" ? "الخط الزمني السياسي" : "Political Timeline"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {language === "ar" ? "تطور الأنشطة السياسية عبر الزمن" : "Political activity evolution over time"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={chartTooltipStyle}
                  labelStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="diplomaticActivity" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name={language === "ar" ? "النشاط الدبلوماسي" : "Diplomatic Activity"}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tensions" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name={language === "ar" ? "التوترات" : "Tensions"}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cooperation" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name={language === "ar" ? "التعاون" : "Cooperation"}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Activity */}
        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Globe className="h-4 w-4 mr-2 text-green-400" />
              {language === "ar" ? "النشاط الإقليمي" : "Regional Activity"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {language === "ar" ? "مستوى النشاط السياسي حسب المنطقة" : "Political activity level by region"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis 
                  dataKey="region" 
                  type="category" 
                  width={language === "ar" ? 120 : 80} 
                  stroke="#9CA3AF" 
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={chartTooltipStyle}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar 
                  dataKey="activity" 
                  fill="#8B5CF6" 
                  name={language === "ar" ? "مستوى النشاط" : "Activity Level"}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Distribution */}
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <TrendingUp className="h-4 w-4 mr-2 text-orange-400" />
            {language === "ar" ? "توزيع المشاعر العامة" : "Overall Sentiment Distribution"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {language === "ar" ? "تحليل المشاعر في النصوص السياسية المعالجة" : "Sentiment analysis of processed political texts"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="w-full lg:w-1/2">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#1F2937"
                    strokeWidth={2}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={chartTooltipStyle}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-4">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm" 
                      style={{ backgroundColor: item.color }}
                      aria-label={`${item.name} indicator`}
                    />
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <span className="text-slate-300 font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Users className="h-4 w-4 mr-2 text-purple-400" />
            {language === "ar" ? "المواضيع الرائجة" : "Trending Topics"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {language === "ar" ? "أكثر المواضيع السياسية بروزاً هذا الأسبوع" : "Most prominent political topics this week"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTopics.map((item, index) => (
              <div 
                key={index} 
                className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/70 transition-all duration-200 cursor-pointer group"
                role="button"
                tabIndex={0}
                onClick={() => console.log(`Clicked on topic: ${item.topic}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    console.log(`Selected topic: ${item.topic}`);
                  }
                }}
              >
                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors leading-relaxed">
                  {item.topic}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">
                    {item.mentions.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')} {language === "ar" ? "إشارة" : "mentions"}
                  </span>
                  <span className="text-green-400 text-sm font-semibold bg-green-400/10 px-2 py-1 rounded">
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
