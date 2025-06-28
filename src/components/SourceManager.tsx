
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Globe, Plus, Settings, CheckCircle, XCircle, Clock } from "lucide-react";

interface SourceManagerProps {
  language: string;
}

export const SourceManager = ({ language }: SourceManagerProps) => {
  const [newSourceUrl, setNewSourceUrl] = useState("");
  const [sources, setSources] = useState([
    {
      id: 1,
      name: "Al Jazeera",
      url: "https://aljazeera.net",
      language: "Arabic",
      status: "active",
      lastScrape: "2 hours ago",
      articlesCollected: 1247,
      reliability: 92,
      isEnabled: true
    },
    {
      id: 2,
      name: "BBC News",
      url: "https://bbc.com/news",
      language: "English",
      status: "active",
      lastScrape: "1 hour ago",
      articlesCollected: 892,
      reliability: 95,
      isEnabled: true
    },
    {
      id: 3,
      name: "Reuters",
      url: "https://reuters.com",
      language: "English",
      status: "active",
      lastScrape: "30 minutes ago",
      articlesCollected: 1456,
      reliability: 97,
      isEnabled: true
    },
    {
      id: 4,
      name: "RT Arabic",
      url: "https://arabic.rt.com",
      language: "Arabic",
      status: "error",
      lastScrape: "6 hours ago",
      articlesCollected: 234,
      reliability: 78,
      isEnabled: false
    },
    {
      id: 5,
      name: "United Nations News",
      url: "https://news.un.org",
      language: "English",
      status: "active",
      lastScrape: "45 minutes ago",
      articlesCollected: 567,
      reliability: 99,
      isEnabled: true
    }
  ]);

  const addSource = () => {
    if (newSourceUrl.trim()) {
      const newSource = {
        id: sources.length + 1,
        name: "New Source",
        url: newSourceUrl,
        language: "Auto-detect",
        status: "pending",
        lastScrape: "Never",
        articlesCollected: 0,
        reliability: 0,
        isEnabled: true
      };
      setSources([...sources, newSource]);
      setNewSourceUrl("");
    }
  };

  const toggleSource = (id: number) => {
    setSources(sources.map(source => 
      source.id === id ? { ...source, isEnabled: !source.isEnabled } : source
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-green-400 text-green-400';
      case 'error':
        return 'border-red-400 text-red-400';
      case 'pending':
        return 'border-yellow-400 text-yellow-400';
      default:
        return 'border-gray-400 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Source */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Plus className="h-4 w-4 mr-2 text-blue-400" />
            {language === "ar" ? "إضافة مصدر جديد" : "Add New Source"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {language === "ar" 
              ? "أضف موقع إخباري أو مصدر سياسي جديد للمراقبة والتحليل"
              : "Add a new news website or political source for monitoring and analysis"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder={language === "ar" ? "رابط الموقع (مثال: https://example.com)" : "Website URL (e.g., https://example.com)"}
              value={newSourceUrl}
              onChange={(e) => setNewSourceUrl(e.target.value)}
              className="flex-1 bg-slate-700/30 border-slate-600 text-white placeholder-slate-400"
            />
            <Button onClick={addSource} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              {language === "ar" ? "إضافة" : "Add"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sources Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {language === "ar" ? "المصادر النشطة" : "Active Sources"}
                </p>
                <p className="text-2xl font-bold text-green-400">
                  {sources.filter(s => s.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {language === "ar" ? "إجمالي المقالات" : "Total Articles"}
                </p>
                <p className="text-2xl font-bold text-blue-400">
                  {sources.reduce((sum, s) => sum + s.articlesCollected, 0).toLocaleString()}
                </p>
              </div>
              <Globe className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {language === "ar" ? "متوسط الموثوقية" : "Avg Reliability"}
                </p>
                <p className="text-2xl font-bold text-purple-400">
                  {Math.round(sources.reduce((sum, s) => sum + s.reliability, 0) / sources.length)}%
                </p>
              </div>
              <Settings className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sources List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Globe className="h-4 w-4 mr-2 text-green-400" />
            {language === "ar" ? "إدارة المصادر" : "Source Management"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {language === "ar" ? "تحكم في المصادر المراقبة وإعداداتها" : "Manage monitored sources and their settings"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sources.map((source) => (
              <div key={source.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(source.status)}
                    <div>
                      <h3 className="font-medium text-white">{source.name}</h3>
                      <p className="text-xs text-slate-400">{source.url}</p>
                    </div>
                  </div>
                  <Switch
                    checked={source.isEnabled}
                    onCheckedChange={() => toggleSource(source.id)}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      {language === "ar" ? "اللغة" : "Language"}
                    </p>
                    <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                      {source.language}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      {language === "ar" ? "الحالة" : "Status"}
                    </p>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(source.status)}`}>
                      {source.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      {language === "ar" ? "المقالات" : "Articles"}
                    </p>
                    <p className="text-sm text-white font-medium">{source.articlesCollected}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      {language === "ar" ? "الموثوقية" : "Reliability"}
                    </p>
                    <p className="text-sm text-white font-medium">{source.reliability}%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>
                    {language === "ar" ? "آخر جمع:" : "Last scraped:"} {source.lastScrape}
                  </span>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                    <Settings className="h-3 w-3 mr-1" />
                    {language === "ar" ? "تكوين" : "Configure"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
