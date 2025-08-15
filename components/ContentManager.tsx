/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Trash2,
  Edit,
  Plus,
  FileText,
  Calendar,
  FolderOpen,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Content } from "@/lib/types/maintitle";
import {
  createContent,
  deleteContent,
  fetchContents,
  selectContentLoading,
  selectContents,
  updateContent,
} from "@/lib/store/slices/contentSlice";
import {
  fetchMainTitlesThunk,
  selectMainTitles,
} from "@/lib/store/slices/mainTitleSlice";

const NO_MAIN_TITLE_VALUE = "no-main-title";

export default function ContentManager() {
  const dispatch = useAppDispatch();
  const contents = useAppSelector(selectContents);
  const loading = useAppSelector(selectContentLoading);
  // const error = useAppSelector(selectContentError);
  const mainTitles = useAppSelector(selectMainTitles);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [mainTitleInput, setMainTitleInput] =
    useState<string>(NO_MAIN_TITLE_VALUE);

  useEffect(() => {
    dispatch(fetchContents());
    dispatch(fetchMainTitlesThunk());
  }, [dispatch]);

  const handleSave = async () => {
    if (!titleInput.trim() || !contentInput.trim()) return;

    const mainTitleValue =
      mainTitleInput === NO_MAIN_TITLE_VALUE ? undefined : mainTitleInput;

    try {
      if (editingId) {
        await dispatch(
          updateContent({
            id: editingId,
            title: titleInput.trim(),
            content: contentInput.trim(),
            mainTitle: mainTitleValue,
          })
        ).unwrap();

        dispatch(fetchContents());
      } else {
        await dispatch(
          createContent({
            title: titleInput.trim(),
            content: contentInput.trim(),
            mainTitle: mainTitleValue,
          })
        ).unwrap();
      }

      setTitleInput("");
      setContentInput("");
      setMainTitleInput(NO_MAIN_TITLE_VALUE);
      setEditingId(null);
      setDialogOpen(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteContent(id)).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startCreate = () => {
    setTitleInput("");
    setContentInput("");
    setMainTitleInput(NO_MAIN_TITLE_VALUE);
    setEditingId(null);
    setDialogOpen(true);
  };

  const startEdit = (content: Content) => {
    setTitleInput(content.title);
    setContentInput(content.content);
    setMainTitleInput(content.mainTitle || NO_MAIN_TITLE_VALUE);
    setEditingId(content._id);
    setDialogOpen(true);
  };

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString();

  const getMainTitleName = (mainTitleId?: any) => {
    console.log("mainTitleId in con", mainTitleId);

    if (!mainTitleId) return "No Main Title";
    const mainTitle = mainTitles.find((mt) => mt._id === mainTitleId?._id);
    console.log("mainTitle in con", mainTitle);

    return mainTitle ? mainTitle.title : "Unknown Main Title";
  };

  if (loading && contents.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading contents...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button onClick={startCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Content
        </Button>
      </div>

      {/* Error Alert */}
      {/* {error && (
        <Alert variant="destructive" className="flex items-center gap-2">
          <AlertDescription>{error}</AlertDescription>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearError())}
            className="ml-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )} */}

      {/* Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contents.map((content) => (
          <Card key={content._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">
                  {content.title}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(content)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete this content?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the content item.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        {/* <AlertDialogAction
                          onClick={() => handleDelete(content._id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 light:text-white"
                        >
                          Delete
                        </AlertDialogAction> */}
                        <AlertDialogAction
                          onClick={() => handleDelete(content._id)}
                          className="
    bg-destructive 
    text-white 
    hover:bg-destructive/90 
    dark:bg-destructive/80 
    dark:text-destructive-foreground
    dark:hover:bg-destructive/70

  "
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground line-clamp-3">
                  {content.content}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FolderOpen className="h-3 w-3" />
                  <span>{getMainTitleName(content.mainTitle)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Created: {formatDate(content.createdAt)}</span>
                </div>
                {content.updatedAt !== content.createdAt && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Updated: {formatDate(content.updatedAt)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {contents.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No content yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first content item to get started.
            </p>
            <Button onClick={startCreate}>Create Content</Button>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Content" : "Create New Content"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <Input
                id="title"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="Enter content title"
              />
            </div>
            {/* Main Title */}
            <div>
              <label
                htmlFor="mainTitle"
                className="block text-sm font-medium mb-2"
              >
                Main Title (Optional)
              </label>
              <Select value={mainTitleInput} onValueChange={setMainTitleInput}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a main title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NO_MAIN_TITLE_VALUE}>
                    No Main Title
                  </SelectItem>
                  {mainTitles.map((mainTitle) => (
                    <SelectItem key={mainTitle._id} value={mainTitle._id}>
                      {mainTitle.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-2"
              >
                Content
              </label>
              <Textarea
                id="content"
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                placeholder="Enter content text"
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!titleInput.trim() || !contentInput.trim() || loading}
            >
              {loading ? "Saving..." : editingId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
