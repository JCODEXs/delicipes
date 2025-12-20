"use client";
import { useEffect } from "react";
import { useUserPreferences } from "~/store/userPreferences";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function SettingsPage() {
  const { 
    preferences, 
    updatePreference, 
    updateNotificationPreference,
    savePreferences, 
    loadPreferences, 
    isLoading 
  } = useUserPreferences();

  useEffect(() => {
    loadPreferences();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Configuración</h1>
      
      {/* Planning Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Planificación de Comidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Modo de Planificación</Label>
            <Select 
              value={preferences.planningMode} 
              onValueChange={(value) => updatePreference("planningMode", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sequential">Secuencial (Día 1, 2, 3...)</SelectItem>
                <SelectItem value="calendar">Calendario (Fechas reales)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Número de días por defecto</Label>
            <Input
              type="number"
              min="1"
              max="30"
              value={preferences.defaultDaysCount}
              onChange={(e) => updatePreference("defaultDaysCount", parseInt(e.target.value))}
            />
          </div>
          
          <div>
            <Label>Ordenes por defecto</Label>
            <Input
              type="number"
              min="1"
              max="20"
              value={preferences.defaultPortions}
              onChange={(e) => updatePreference("defaultPortions", parseInt(e.target.value))}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={preferences.autoSavePrograms}
              onCheckedChange={(checked) => updatePreference("autoSavePrograms", checked)}
            />
            <Label>Guardar programas automáticamente</Label>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={preferences.notifications.mealReminders}
              onCheckedChange={(checked) => updateNotificationPreference("mealReminders", checked)}
            />
            <Label>Recordatorios de comidas</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={preferences.notifications.shoppingListUpdates}
              onCheckedChange={(checked) => updateNotificationPreference("shoppingListUpdates", checked)}
            />
            <Label>Actualizaciones de lista de compras</Label>
          </div>
        </CardContent>
      </Card>

      <Button onClick={savePreferences} disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar Configuración"}
      </Button>
    </div>
  );
}