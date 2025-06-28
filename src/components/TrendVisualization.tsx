
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Globe, Users, Calendar } from "lucide-react";

interface TrendVisualizationProps {
  language: string;
}

export const TrendVisualization = ({ language }: TrendVisualizationProps) => {
  const timelineData = [
    { month: 'Jan', diplomaticActivity: 65, tensions: 35, cooperation: 80 },
    { month: 'Feb', diplomaticActivity: 70, tensions: 30, cooperation: 85 },
    { month: 'Mar', diplomaticActivity: 75, tensions: 25, cooperation: 90 },
    { month: 'Apr', diplomaticActivity: 80, tensions: 40, cooperation: 75 },
    { month: 'May', diplomaticActivity: 85, tensions: 35, cooperation: 85 },
    { month: 'Jun', diplomaticActivity: 90, tensions: 20, cooperation: 95 }
  ];

  const regionData = [
    { region: 'Middle East', activity: 85 },
    { region: 'Europe', activity: 78 },
    { region: 'Asia Pacific', activity: 92 },
    { region: 'Americas', activity: 67 },
    { region: 'Africa', activity: 73 }
  ];

  const sentimentData = [
    { name: 'Positive', value: 45, color: '#10B981' },
    { name: 'Neutral', value: 35, color: '#F59E0B' },
    { name: 'Negative', value: 20, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Political Timeline */}
        <Card className="bg-slate-800/50 border-slate-700">
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
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="diplomaticActivity" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="tensions" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="cooperation" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Activity */}
        <Card className="bg-slate-800/50 border-slate-700">
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
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="region" type="category" width={80} stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="activity" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Distribution */}
      <Card className="bg-slate-800/50 border-slate-700">
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
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-4">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white">{item.name}</span>
                  </div>
                  <span className="text-slate-400">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="bg-slate-800/50 border-slate-700">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { topic: language === "ar" ? "السياسة الخارجية" : "Foreign Policy", mentions: 1247, trend: "+15%" },
              { topic: language === "ar" ? "التغير المناخي" : "Climate Change", mentions: 892, trend: "+23%" },
              { topic: language === "ar" ? "الأمن الإقليمي" : "Regional Security", mentions: 756, trend: "+8%" },
              { topic: language === "ar" ? "التجارة الدولية" : "International Trade", mentions: 634, trend: "+12%" },
              { topic: language === "ar" ? "حقوق الإنسان" : "Human Rights", mentions: 523, trend: "+18%" },
              { topic: language === "ar" ? "الطاقة المتجددة" : "Renewable Energy", mentions: 467, trend: "+31%" }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded border border-slate-600/50">
                <h3 className="font-medium text-white mb-2">{item.topic}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">{item.mentions} mentions</span>
                  <span className="text-green-400 text-sm font-medium">{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
